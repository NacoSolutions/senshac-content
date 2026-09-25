{ pkgs, ... }:

{
  packages = [ pkgs.bun ];

  scripts.validate.exec = "bun scripts/validate_export.mjs";
  scripts.test.exec = "bun test";
  scripts.lint.exec = "bunx --bun biome check scripts tests";
  scripts.typecheck.exec = "bun --check scripts/validate_export.mjs";

  enterShell = ''
    echo "senshac-content development environment"
    echo "Run: bun install --frozen-lockfile"
  '';
}
