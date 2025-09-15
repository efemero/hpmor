#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use open qw(:std :utf8);

my @files = @ARGV;
if (!@files) {
  die "Usage: $0 FILE [FILE ...]\n";
}

for my $file (@files) {
  local $/ = undef;
  open my $fh, '<', $file or die "Cannot read $file: $!";
  my $s = <$fh>;
  close $fh;

  # 1) Spaces before ; ! ? -> thin NBSP (U+202F)
  $s =~ s/(\S)(?:[ \x{00A0}\x{2009}]*)?([;!?])/$1\x{202F}$2/g;

  # 1b) Spaces before : -> thin NBSP, but avoid Pandoc fenced divs (:::), and attribute opener '{'
  #    Also avoid times like 12:34 by reverting the thin space when both sides are digits
  $s =~ s/(?<!:)(\S)(?:[ \x{00A0}\x{2009}]*)?:(?![:{])/$1\x{202F}:/g;
  $s =~ s/(\d)\x{202F}:(\d)/$1:$2/g;

  # 2) Guillemets inner spacing -> thin NBSP
  $s =~ s/«[ \x{00A0}\x{2009}]*/«\x{202F}/g;
  $s =~ s/[ \x{00A0}\x{2009}]*»/\x{202F}»/g;

  # 3) Ellipses
  $s =~ s/\.\.\./…/g;

  # 4) Apostrophes (straight -> typographic)
  $s =~ s/'/’/g;

  # 5) Dashes
  #   a) double hyphen between spaces -> em dash with thin spaces
  $s =~ s/[ \x{00A0}\x{2009}]+--[ \x{00A0}\x{2009}]+/\x{202F}—\x{202F}/g;
  #   b) spaced single hyphen not between digits -> em dash with thin spaces
  $s =~ s/(?<!\d)[ \x{00A0}\x{2009}]+-[ \x{00A0}\x{2009}]+(?!\d)/\x{202F}—\x{202F}/g;
  #   c) normalize spaces around existing em dashes inside lines
  $s =~ s/[ \x{00A0}\x{2009}]+—[ \x{00A0}\x{2009}]+/\x{202F}—\x{202F}/g;
  #   d) line-start em dash: ensure only trailing thin space
  $s =~ s/^—[ \x{00A0}\x{2009}]*/—\x{202F}/mg;
  #   e) ensure thin space before em dash when attached after non-space
  $s =~ s/(\S)[ \x{00A0}\x{2009}]*—/$1\x{202F}—/g;
  #   f) ensure thin space after em dash when attached before non-space
  $s =~ s/—[ \x{00A0}\x{2009}]*(\S)/—\x{202F}$1/g;

  # 6) Fixups for Pandoc fenced div markers (avoid spaces inside ::: blocks)
  #    Remove any thin spaces inadvertently inserted between consecutive colons
  $s =~ s/:\x{202F}:/::/g;
  $s =~ s/:::\x{202F}/:::/g;
  #    Merge any broken quad-colon markers like ':::\x{202F}:' back to '::::'
  $s =~ s/:::\x{202F}:/::::/g;
  $s =~ s/^:::\x{202F}:$/::::/mg;
  #    Generic: collapse any colon-thin-colon runs on a single line back together
  $s =~ s/^(:+)\x{202F}(:+)$/$1$2/mg;

  # 7) URL schemes: remove thin space before ':' in schemes (http, https, etc.)
  #    a) before ://
  $s =~ s/\x{202F}:(?=\/\/)/:/g;
  #    b) mailto:, ftp:, file:, etc.
  $s =~ s/\b(mailto|ftp|file|news|irc|data)\x{202F}:/$1:/gi;

  open my $out, '>', $file or die "Cannot write $file: $!";
  print {$out} $s;
  close $out;
}
