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
    /// Apply all transformations (order: spaces, ellipses, apostrophes, dashes, quotes, times, words, cleanup)
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
        if run.apostrophes {
            s = pass_apostrophes(&s);
        }
        if run.dashes {
            s = pass_dashes(&s);
        }
        if run.quotes {
            s = pass_quotes(&s);
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

        if s != orig {
            if cli.write {
                fs::write(&path, s).with_context(|| format!("Cannot write {}", path.display()))?;
                println!("UPDATED: {}", path.display());
            } else {
                println!("CHANGED: {}", path.display());
            }
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
    s.replace('\'', "’")
}

fn pass_ellipses(s: &str) -> String {
    Regex::new(r"\.\.\.")
        .unwrap()
        .replace_all(s, "…")
        .into_owned()
}

fn pass_spaces_punct(s: &str) -> String {
    let re_sc = Regex::new(r"(\S)\s*([;!?])").unwrap();
    let re_colon = Regex::new(r"([^:\s])\s*:").unwrap();
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
    let re_double_hyphen = Regex::new(r"[ \u{00A0}\u{2009}]+--[ \u{00A0}\u{2009}]+").unwrap();
    // Spaced single hyphen not between digits: capture surrounding non-digits
    let re_spaced_single =
        Regex::new(r"([^\d])[ \u{00A0}\u{2009}]+-[ \u{00A0}\u{2009}]+([^\d])").unwrap();
    let re_em_inside = Regex::new(r"[ \u{00A0}\u{2009}]+—[ \u{00A0}\u{2009}]+").unwrap();
    let re_line_start = Regex::new(r"(?m)^—[ \u{00A0}\u{2009}]*").unwrap();
    let re_before_em = Regex::new(r"(\S)[ \u{00A0}\u{2009}]*—").unwrap();
    let re_after_em = Regex::new(r"—[ \u{00A0}\u{2009}]*(\S)").unwrap();
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
    // Curly English to French
    out = out.replace('\u{201C}', "«");
    out = out.replace('\u{201D}', "»");
    // Nested French inner pairs to English curly, iteratively
    let nested = Regex::new("«([^«»]*?)«([^«»]+?)»([^«»]*?)»").unwrap();
    loop {
        let new = nested.replace_all(&out, "«$1“$2”$3»").into_owned();
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
    let mut out = String::with_capacity(text.len());
    let mut open = false;
    for ch in text.chars() {
        if ch == '"' {
            if !open {
                out.push('«');
            } else {
                out.push('»');
            }
            open = !open;
        } else {
            out.push(ch);
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
        let t = rtrim_nbsp(line);
        if t.chars().all(|c| c == ' ' || c == '\t' || c == '\u{00A0}') {
            out.push('\n');
        } else {
            out.push_str(t);
            out.push('\n');
        }
    }
    out
}

fn rtrim_nbsp(s: &str) -> &str {
    let mut end = s.len();
    while end > 0 {
        let ch = s[..end].chars().rev().next().unwrap();
        if ch == ' ' || ch == '\t' || ch == '\u{00A0}' {
            end -= ch.len_utf8();
        } else {
            break;
        }
    }
    &s[..end]
}
