#!/usr/bin/env nix
//! Minimal checker for orphan French guillemets « » and interleaved
//! Markdown emphasis markers (*, **, _, __) across guillemets.
//!
//! Usage examples (globs expanded by your shell):
//!   rust-script tools/orphans.rs md/*.md
//!   nix shell nixpkgs#rust-script --command rust-script tools/orphans.rs md/*.md
/*
#!nix shell nixpkgs#clang nixpkgs#cargo nixpkgs#rustc nixpkgs#rust-script --command rust-script
*/

use std::env;
use std::fs;
use std::path::Path;

fn main() {
    let mut args = env::args().skip(1).collect::<Vec<_>>();
    if args.is_empty() {
        eprintln!(
            "Usage: rust-script tools/orphans.rs <FILES...>\n\
Reports:\n\
  - unmatched guillemets as 'path:line: orphan …'\n\
  - interleaved guillemets/emphasis like « *… »* or * « … * » as 'path:line: interleaved (* or _)'
            "
        );
        std::process::exit(2);
    }

    let mut had_issue = false;
    for path in args.drain(..) {
        report_file(&path, &mut had_issue);
    }
}

fn report_file<P: AsRef<Path>>(path: P, had_issue: &mut bool) {
    let p = path.as_ref();
    let Ok(text) = fs::read_to_string(p) else {
        eprintln!("WARN: cannot read {}", p.display());
        return;
    };

    // Build a flat string with offsets per line
    let mut offsets: Vec<usize> = Vec::new(); // starting byte offset of each 1-based line
    let mut buf = String::with_capacity(text.len());
    let mut off = 0usize;
    for (idx, line) in text.lines().enumerate() {
        let lnum = idx + 1;
        offsets.push(off); // line start offset
        buf.push_str(line);
        buf.push('\n');
        off = buf.len();
        let _ = lnum; // silence unused if needed
    }

    // Pass 1: collect guillemet pairs and orphan closers
    #[derive(Clone, Copy)]
    struct Pair {
        start_off: usize,
        end_off: usize,
        start_line: usize,
        end_line: usize,
    }
    let mut guil_pairs: Vec<Pair> = Vec::new();
    let mut guil_stack: Vec<(usize, usize)> = Vec::new(); // (start_off, start_line)

    let bytes = buf.as_bytes();
    let mut i = 0usize;
    let mut cur_line = 1usize;
    while i < bytes.len() {
        let b = bytes[i];
        if b == b'\n' {
            cur_line += 1;
            i += 1;
            continue;
        }
        if buf[i..].starts_with("«") {
            guil_stack.push((i, cur_line));
            i += "«".len();
            continue;
        }
        if buf[i..].starts_with("»") {
            if let Some((start_off, start_line)) = guil_stack.pop() {
                guil_pairs.push(Pair {
                    start_off,
                    end_off: i,
                    start_line,
                    end_line: cur_line,
                });
            } else {
                println!("{} +{}: orphan »", p.display(), cur_line);
                *had_issue = true;
            }
            i += "»".len();
            continue;
        }
        // advance one char
        if let Some(ch) = buf[i..].chars().next() {
            i += ch.len_utf8();
        } else {
            break;
        }
    }
    // Orphan openings remain
    if !guil_stack.is_empty() {
        *had_issue = true;
        for (_off, line) in guil_stack {
            println!("{} +{}: orphan «", p.display(), line);
        }
    }

    // Helper to know if an offset lies inside any guillemet pair
    let is_inside = |pos: usize| -> bool {
        for p in &guil_pairs {
            if pos > p.start_off && pos < p.end_off {
                return true;
            }
        }
        false
    };

    // Character classification helpers for emphasis boundaries
    fn prev_char(s: &str, i: usize) -> Option<char> {
        if i == 0 {
            return None;
        }
        s[..i].chars().rev().next()
    }
    fn next_char(s: &str, i: usize) -> Option<char> {
        if i >= s.len() {
            return None;
        }
        s[i..].chars().next()
    }
    fn is_space_like(c: Option<char>) -> bool {
        match c {
            Some(ch) => {
                ch == ' ' || ch == '\t' || ch == '\n' || ch == '\u{00A0}' || ch == '\u{202F}'
            }
            None => true,
        }
    }
    fn is_punct_like(ch: char) -> bool {
        // broad set of punctuation incl. guillemets and dashes
        ch.is_ascii_punctuation()
            || matches!(
                ch,
                '«' | '»' | '…' | '—' | '–' | '“' | '”' | '’' | '«' | '»'
            )
    }
    fn is_left_boundary(prev: Option<char>) -> bool {
        prev.map(|c| is_space_like(Some(c)) || is_punct_like(c))
            .unwrap_or(true)
    }
    fn is_right_boundary(next: Option<char>) -> bool {
        next.map(|c| is_space_like(Some(c)) || is_punct_like(c))
            .unwrap_or(true)
    }
    fn is_left_word(prev: Option<char>) -> bool {
        prev.map(|c| c.is_alphanumeric()).unwrap_or(false)
    }
    fn is_right_word(next: Option<char>) -> bool {
        next.map(|c| c.is_alphanumeric()).unwrap_or(false)
    }
    fn skip_spaces_str(s: &str, mut i: usize) -> usize {
        while i < s.len() {
            if s[i..].starts_with(' ') || s[i..].starts_with('\t') || s[i..].starts_with('\n') {
                i += 1;
                continue;
            }
            if s[i..].starts_with('\u{00A0}') {
                i += '\u{00A0}'.len_utf8();
                continue;
            }
            if s[i..].starts_with('\u{202F}') {
                i += '\u{202F}'.len_utf8();
                continue;
            }
            break;
        }
        i
    }

    // Pass 2: scan emphasis segments and report crossings on close
    #[derive(Clone, Copy)]
    struct ESeg {
        marker: &'static str,
        open_off: usize,
        open_line: usize,
    }
    let mut estack: Vec<ESeg> = Vec::new();
    i = 0;
    cur_line = 1;
    while i < bytes.len() {
        let b = bytes[i];
        if b == b'\n' {
            cur_line += 1;
            i += 1;
            continue;
        }
        let m = if buf[i..].starts_with("**") {
            Some("**")
        } else if buf[i..].starts_with("__") {
            Some("__")
        } else if buf[i..].starts_with("*") {
            Some("*")
        } else if buf[i..].starts_with("_") {
            Some("_")
        } else {
            None
        };
        if let Some(marker) = m {
            // Special-case: pattern like "<m> [space] » [space] <m>" across boundary
            // where spaces may include NBSP (U+00A0) or thin NBSP (U+202F).
            let mut j = i + marker.len();
            j = skip_spaces_str(&buf, j);
            if buf[j..].starts_with("»") {
                let mut k = j + "»".len();
                k = skip_spaces_str(&buf, k);
                if buf[k..].starts_with(marker) {
                    let open_in = is_inside(i);
                    let close_in = is_inside(k);
                    if open_in && !close_in {
                        println!(
                            "{} +{}: interleaved guillemets/emphasis (« {}…» {})",
                            p.display(),
                            cur_line,
                            marker,
                            marker
                        );
                        *had_issue = true;
                    } else if !open_in && close_in {
                        println!(
                            "{} +{}: interleaved guillemets/emphasis ({} « … {} »)",
                            p.display(),
                            cur_line,
                            marker,
                            marker
                        );
                        *had_issue = true;
                    }
                }
            }
            let prev = prev_char(&buf, i);
            let next = next_char(&buf, i + marker.len());
            let can_open = is_left_boundary(prev) && is_right_word(next);
            let can_close = is_left_word(prev) && is_right_boundary(next);
            let has_open_same = estack.last().map(|e| e.marker == marker).unwrap_or(false);

            // Prefer closing if we have an open of the same marker and either
            // (a) boundary says we can close, or (b) boundary says we cannot open.
            if has_open_same && (can_close || !can_open) {
                let opened = estack.pop().unwrap();
                let open_in = is_inside(opened.open_off);
                let close_in = is_inside(i);
                if open_in && !close_in {
                    println!(
                        "{} +{}: interleaved guillemets/emphasis (« {}…» {})",
                        p.display(),
                        cur_line,
                        marker,
                        marker
                    );
                    *had_issue = true;
                } else if !open_in && close_in {
                    println!(
                        "{} +{}: interleaved guillemets/emphasis ({} « … {} »)",
                        p.display(),
                        cur_line,
                        marker,
                        marker
                    );
                    *had_issue = true;
                }
                i += marker.len();
                continue;
            }

            if can_open {
                estack.push(ESeg {
                    marker,
                    open_off: i,
                    open_line: cur_line,
                });
                i += marker.len();
                continue;
            }
            // treat as literal
            i += marker.len();
            continue;
        }
        if let Some(ch) = buf[i..].chars().next() {
            i += ch.len_utf8();
        } else {
            break;
        }
    }
}

// (no per-line interleaving helper; handled in the main scanner)
