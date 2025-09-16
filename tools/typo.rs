#!/usr/bin/env nix
//! ```cargo
//! [dependencies]
//! anyhow = "1.0.95"
//! regex = "1"
//! glob = "0.3"
//! clap = { version = "=4.5.45", features = ["derive"] }
//! clap_derive = "=4.5.45"
//! ```
/*
#!nix shell nixpkgs#clang nixpkgs#cargo nixpkgs#rustc nixpkgs#rust-script --command rust-script
*/

use anyhow::{bail, Context, Result};
use clap::Parser;
use glob::glob;
use regex::Regex;
use std::fs;
use std::path::PathBuf;

#[derive(Parser, Debug)]
#[command(name = "typo", about = "French typography normalizer", version)]
struct Cli {
    /// Apply all transformations (order: spaces, ellipses, dashes, quotes, apostrophes, times, words, cleanup)
    #[arg(short = 'a', long = "all")]
    all: bool,

    /// Convert straight apostrophes ' to typographic ’
    #[arg(long)]
    apostrophes: bool,

    /// Normalize quotes to « … » and nested “ … ” (and spacing inside)
    #[arg(long)]
    quotes: bool,

    /// Insert thin NBSP before ; : ! ? with exceptions (URLs, :::, times)
    #[arg(long = "spaces-punct")]
    spaces_punct: bool,

    /// Normalize time formats (11:45 -> 11 h 45; 6h45 -> 6 h 45; 6h -> 6 h)
    #[arg(long)]
    times: bool,

    /// Convert ... to …
    #[arg(long)]
    ellipses: bool,

    /// Normalize dashes to em dash with thin spaces
    #[arg(long)]
    dashes: bool,

    /// Word-level fixes (e.g., c’est-à-dire)
    #[arg(long)]
    words: bool,

    /// Cleanup whitespace artifacts (NBSP-only lines, trailing spaces)
    #[arg(long)]
    cleanup: bool,

    /// Write changes in place (otherwise dry-run)
    #[arg(long)]
    write: bool,

    /// Files or globs (e.g., md/*.md)
    #[arg(value_name = "PATHS", required = true)]
    paths: Vec<String>,
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    let files = collect_files(&cli.paths)?;
    if files.is_empty() {
        bail!("No files matched the provided paths/globs");
    }

    // Determine which passes to run
    let mut run = Passes::default();
    if cli.all {
        run = Passes::all();
    } else {
        run.apostrophes = cli.apostrophes;
        run.quotes = cli.quotes;
        run.spaces_punct = cli.spaces_punct;
        run.times = cli.times;
        run.ellipses = cli.ellipses;
        run.dashes = cli.dashes;
        run.words = cli.words;
        run.cleanup = cli.cleanup;
        if !run.any() {
            bail!("Select at least one pass (e.g., --quotes) or use --all");
        }
    }

    let multi = files.len() > 1;
    for path in files {
        let orig =
            fs::read_to_string(&path).with_context(|| format!("Cannot read {}", path.display()))?;
        let mut s = orig.replace("\r\n", "\n").replace('\r', "\n");

        if run.spaces_punct {
            s = pass_spaces_punct(&s);
        }
        if run.ellipses {
            s = pass_ellipses(&s);
        }
        if run.dashes {
            s = pass_dashes(&s);
        }
        if run.quotes {
            s = pass_quotes(&s);
        }
        if run.apostrophes {
            s = pass_apostrophes(&s);
        }
        if run.times {
            s = pass_times(&s);
        }
        if run.words {
            s = pass_words(&s);
        }
        if run.cleanup {
            s = pass_cleanup(&s);
        }

        if cli.write {
            if s != orig {
                fs::write(&path, s).with_context(|| format!("Cannot write {}", path.display()))?;
                eprintln!("UPDATED: {}", path.display());
            }
        } else {
            if multi {
                println!("===== {} =====", path.display());
            }
            print!("{}", s);
        }
    }

    Ok(())
}

#[derive(Default)]
struct Passes {
    apostrophes: bool,
    quotes: bool,
    spaces_punct: bool,
    times: bool,
    ellipses: bool,
    dashes: bool,
    words: bool,
    cleanup: bool,
}

impl Passes {
    fn all() -> Self {
        Self {
            apostrophes: true,
            quotes: true,
            spaces_punct: true,
            times: true,
            ellipses: true,
            dashes: true,
            words: true,
            cleanup: true,
        }
    }
    fn any(&self) -> bool {
        self.apostrophes
            || self.quotes
            || self.spaces_punct
            || self.times
            || self.ellipses
            || self.dashes
            || self.words
            || self.cleanup
    }
}

fn collect_files(inputs: &[String]) -> Result<Vec<PathBuf>> {
    let mut out = Vec::new();
    for p in inputs {
        if p.contains('*') || p.contains('?') || p.contains('[') {
            for entry in glob(p)? {
                let path = entry?;
                if path.is_file() {
                    out.push(path);
                }
            }
        } else {
            out.push(PathBuf::from(p));
        }
    }
    Ok(out)
}

// Pass implementations

fn pass_apostrophes(s: &str) -> String {
    // Replace only real apostrophes between letters; avoid touching standalone quotes
    let re_between = Regex::new(r"(\p{L})'(\p{L})").unwrap();
    re_between.replace_all(s, "$1’$2").into_owned()
}

fn pass_ellipses(s: &str) -> String {
    Regex::new(r"\.\.\.")
        .unwrap()
        .replace_all(s, "…")
        .into_owned()
}

fn pass_spaces_punct(s: &str) -> String {
    // Avoid crossing newlines when inserting thin spaces
    let re_sc = Regex::new(r"(\S)[^\S\r\n]*([;!?])").unwrap();
    let re_colon = Regex::new(r"([^:\s])[^\S\r\n]*:").unwrap();
    let re_time_revert = Regex::new(r"(\d)\u{202F}:(\d)").unwrap();
    let re_url_scheme_slash = Regex::new(r"\u{202F}://").unwrap();
    let re_url_scheme_named = Regex::new(r"\b(mailto|ftp|file|news|irc|data)\u{202F}:").unwrap();
    let re_colon_thin_colon = Regex::new(r":\u{202F}:").unwrap();
    let re_triple_colon_thin = Regex::new(r":::\u{202F}").unwrap();
    let re_quad_merge = Regex::new(r":::\u{202F}:").unwrap();
    let re_quad_line = Regex::new(r"(?m)^:::\u{202F}:$").unwrap();
    let re_collapse_line = Regex::new(r"(?m)^(:+)\u{202F}(:+)$").unwrap();
    let re_attr_after = Regex::new(r"\u{202F}:\{").unwrap();

    let mut out = re_sc.replace_all(s, "$1\u{202F}$2").into_owned();
    out = re_colon.replace_all(&out, "$1\u{202F}:").into_owned();
    out = re_time_revert.replace_all(&out, "$1:$2").into_owned();
    out = re_url_scheme_slash.replace_all(&out, "://").into_owned();
    out = re_url_scheme_named.replace_all(&out, "$1:").into_owned();
    out = re_attr_after.replace_all(&out, ":{").into_owned();
    out = re_colon_thin_colon.replace_all(&out, "::").into_owned();
    out = re_triple_colon_thin.replace_all(&out, ":::").into_owned();
    out = re_quad_merge.replace_all(&out, "::::").into_owned();
    out = re_quad_line.replace_all(&out, "::::").into_owned();
    out = re_collapse_line.replace_all(&out, "$1$2").into_owned();
    out
}

fn pass_times(s: &str) -> String {
    let re_hhmm = Regex::new(r"\b(\d{1,2}):(\d{2})\b").unwrap();
    let re_hh_hh = Regex::new(r"\b(\d{1,2})\s*h\s*(\d{2})\b").unwrap();
    let re_hh = Regex::new(r"\b(\d{1,2})\s*h\b").unwrap();
    let mut out = re_hhmm.replace_all(s, "$1\u{00A0}h\u{00A0}$2").into_owned();
    out = re_hh_hh
        .replace_all(&out, "$1\u{00A0}h\u{00A0}$2")
        .into_owned();
    out = re_hh.replace_all(&out, "$1\u{00A0}h").into_owned();
    out
}

fn pass_dashes(s: &str) -> String {
    // Treat ASCII space, NBSP (U+00A0), thin space (U+2009) and thin NBSP (U+202F)
    let sp = r" \u{00A0}\u{2009}\u{202F}";
    let re_double_hyphen = Regex::new(&format!(r"[{sp}]+--[{sp}]+", sp = sp)).unwrap();
    // Spaced single hyphen not between digits: capture surrounding non-digits
    let re_spaced_single = Regex::new(&format!(
        r"([^\d])[{sp}]+-[{sp}]+([^\d])",
        sp = sp
    ))
    .unwrap();
    let re_em_inside = Regex::new(&format!(r"[{sp}]+—[{sp}]+", sp = sp)).unwrap();
    let re_line_start = Regex::new(&format!(r"(?m)^—[{sp}]*", sp = sp)).unwrap();
    let re_before_em = Regex::new(&format!(r"(\S)[{sp}]*—", sp = sp)).unwrap();
    let re_after_em = Regex::new(&format!(r"—[{sp}]*(\S)", sp = sp)).unwrap();
    let mut out = re_double_hyphen
        .replace_all(s, "\u{202F}—\u{202F}")
        .into_owned();
    out = re_spaced_single
        .replace_all(&out, "$1\u{202F}—\u{202F}$2")
        .into_owned();
    out = re_em_inside
        .replace_all(&out, "\u{202F}—\u{202F}")
        .into_owned();
    out = re_line_start.replace_all(&out, "—\u{202F}").into_owned();
    out = re_before_em.replace_all(&out, "$1\u{202F}—").into_owned();
    out = re_after_em.replace_all(&out, "—\u{202F}$1").into_owned();
    out
}

fn pass_quotes(s: &str) -> String {
    let mut out = convert_straight_quotes_to_french(s);
    // Curly English to French, but only at top-level (not inside existing « … »)
    out = convert_curly_to_french_top_level(&out);
    // Nested French inner pairs to English curly, iteratively
    let nested = Regex::new("«([^«»]*?)«([^«»]+?)»([^«»]*?)»").unwrap();
    loop {
        let new = nested.replace_all(&out, "«$1“$2”$3»").into_owned();
        if new == out {
            break;
        }
        out = new;
    }
    // Inside « … », convert ' … ' (with surrounding spaces) to “ … ”
    let ws = "[\\s\\u{00A0}\\u{202F}]"; // space, NBSP, thin NBSP
    let inner_ascii = Regex::new(&format!(
        "«([^«»]*?)({ws})'([^'»]+)'({ws}[^«»]*?)»",
        ws = ws
    ))
    .unwrap();
    loop {
        let new = inner_ascii.replace_all(&out, "«$1$2“$3”$4»").into_owned();
        if new == out {
            break;
        }
        out = new;
    }
    // Also handle ’ … ’ with surrounding spaces
    let inner_curly = Regex::new(&format!(
        "«([^«»]*?)({ws})’([^’»]+)’({ws}[^«»]*?)»",
        ws = ws
    ))
    .unwrap();
    loop {
        let new = inner_curly.replace_all(&out, "«$1$2“$3”$4»").into_owned();
        if new == out {
            break;
        }
        out = new;
    }
    // Thin NBSP inside guillemets
    let re_open = Regex::new("«\\s*").unwrap();
    let re_close = Regex::new("\\s*»").unwrap();
    out = re_open.replace_all(&out, "«\u{202F}").into_owned();
    out = re_close.replace_all(&out, "\u{202F}»").into_owned();
    // Move a comma outside after » to inside before »:  … », → …, »
    let re_comma_tight = Regex::new(r"\u{202F}»,").unwrap();
    out = re_comma_tight
        .replace_all(&out, ",\u{202F}»")
        .into_owned();
    let re_comma_outside = Regex::new(r"»[^\S\r\n]*,").unwrap();
    out = re_comma_outside
        .replace_all(&out, ",\u{202F}»")
        .into_owned();
    // collapse duplicates before »
    let re_dup = Regex::new("\u{202F}+»").unwrap();
    out = re_dup.replace_all(&out, "\u{202F}»").into_owned();
    // Fix em-dash double thin before »
    let re_dash = Regex::new("—\u{202F}{2,}»").unwrap();
    out = re_dash.replace_all(&out, "—\u{202F}»").into_owned();
    // Remove leading thin space before » at line start
    let re_line = Regex::new("(?m)^\u{202F}»").unwrap();
    out = re_line.replace_all(&out, "»").into_owned();
    out
}

fn convert_straight_quotes_to_french(text: &str) -> String {
    let chars: Vec<char> = text.chars().collect();
    let mut out = String::with_capacity(text.len());
    let mut french_level = 0i32; // depth of « »
    let mut open_top_dq = false; // top-level " … " → « … »
    let mut open_inner_dq = false; // inner " … " → “ … ”
    let mut open_top_sq = false; // top-level ' … ' → « … »
    let mut open_inner_sq = false; // inner ' … ' → “ … ”
    let len = chars.len();
    for i in 0..len {
        let ch = chars[i];
        match ch {
            '«' => {
                french_level += 1;
                out.push('«');
            }
            '»' => {
                french_level = (french_level - 1).max(0);
                out.push('»');
            }
            '"' => {
                if french_level == 0 {
                    if !open_top_dq {
                        out.push('«');
                    } else {
                        out.push('»');
                    }
                    open_top_dq = !open_top_dq;
                } else {
                    if !open_inner_dq {
                        out.push('\u{201C}'); // “
                    } else {
                        out.push('\u{201D}'); // ”
                    }
                    open_inner_dq = !open_inner_dq;
                }
            }
            '\'' => {
                // Apostrophe between letters stays an apostrophe; otherwise treat as a quote delimiter
                let prev = if i > 0 { chars[i - 1] } else { '\0' };
                let next = if i + 1 < len { chars[i + 1] } else { '\0' };
                if prev.is_alphabetic() && next.is_alphabetic() {
                    out.push('’');
                } else {
                    if french_level == 0 {
                        if !open_top_sq {
                            out.push('«');
                        } else {
                            out.push('»');
                        }
                        open_top_sq = !open_top_sq;
                    } else {
                        if !open_inner_sq {
                            out.push('\u{201C}'); // “
                        } else {
                            out.push('\u{201D}'); // ”
                        }
                        open_inner_sq = !open_inner_sq;
                    }
                }
            }
            _ => out.push(ch),
        }
    }
    out
}

fn convert_curly_to_french_top_level(text: &str) -> String {
    // Only convert “ ” to « » when not already inside « … »
    let mut out = String::with_capacity(text.len());
    let mut level = 0i32; // nesting level of French guillemets
    for ch in text.chars() {
        match ch {
            '«' => {
                level += 1;
                out.push('«');
            }
            '»' => {
                level = (level - 1).max(0);
                out.push('»');
            }
            '\u{201C}' => {
                if level == 0 {
                    out.push('«');
                } else {
                    out.push('\u{201C}');
                }
            }
            '\u{201D}' => {
                if level == 0 {
                    out.push('»');
                } else {
                    out.push('\u{201D}');
                }
            }
            _ => out.push(ch),
        }
    }
    out
}

fn pass_words(s: &str) -> String {
    Regex::new(r"\b([Cc])[’']est\s*à\s*dire\b")
        .unwrap()
        .replace_all(s, "$1’est-à-dire")
        .into_owned()
}

fn pass_cleanup(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    for line in s.lines() {
        // Remove trailing tabs and NBSPs, but preserve a Markdown hard break (two spaces)
        let mut trimmed = line;
        // First, drop any trailing NBSP or tabs
        while let Some(ch) = trimmed.chars().rev().next() {
            if ch == '\u{00A0}' || ch == '\t' {
                trimmed = &trimmed[..trimmed.len() - ch.len_utf8()];
            } else {
                break;
            }
        }
        // Count trailing ASCII spaces
        let mut cnt = 0usize;
        for ch in trimmed.chars().rev() {
            if ch == ' ' {
                cnt += 1;
            } else {
                break;
            }
        }
        // Remove all trailing spaces, then re-add exactly two if there were two or more
        let prefix = &trimmed[..trimmed.len().saturating_sub(cnt)];
        let mut rebuilt = String::from(prefix);
        if cnt >= 2 {
            rebuilt.push_str("  ");
        }

        // If the line content is only whitespace after cleanup, keep as blank line
        if rebuilt
            .chars()
            .all(|c| c == ' ' || c == '\t' || c == '\u{00A0}')
        {
            out.push('\n');
        } else {
            out.push_str(&rebuilt);
            out.push('\n');
        }
    }
    out
}
