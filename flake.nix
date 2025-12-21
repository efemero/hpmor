{
  description = "Tools for hpmor";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      texliveCustom = pkgs.texliveSmall.withPackages (ps: [
        ps.soulpos
        ps.alegreya
        ps.babel
        ps.fontspec
        ps.microtype
        ps.setspace
        ps.lettrine
        ps.titlesec
        ps.hologo
        ps.hyperref
        ps.xetex
        ps.memoir
        ps.xpatch
        ps.pdfjam
      ]);

      nativeBuildInputs = [
        pkgs.mdbook
        texliveCustom
        pkgs.pandoc
        pkgs.just
        pkgs.typst
      ];
    in
    {
      packages.${system}.default = pkgs.stdenv.mkDerivation {
        name = "hpmor";
        inherit system nativeBuildInputs;
        src = ./.;
      };

      devShells.default = pkgs.mkShell {
        inherit system nativeBuildInputs;
      };
    };
}
