const esbuild = require("esbuild");

const production = process.argv[2] === "--production";
const watch = process.argv[2] === "--watch";

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["./src/extension.ts"],
    bundle: true,
    outdir: "./out",
    external: ["vscode", "open"],
    format: "cjs",
    sourcemap: !production,
    minify: production,
    platform: "node",
    target: ["node16"],
  });

  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
