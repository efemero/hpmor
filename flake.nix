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
