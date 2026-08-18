import * as os from "os";
import * as path from "path";

import { runTests } from "@vscode/test-electron";

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // The path to the extension test runner script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, "./index");

    // A long extensionDevelopmentPath produces a --user-data-dir whose IPC
    // socket path exceeds the OS limit (Unix domain sockets are capped at
    // ~103 chars), so point it at a short path under the OS temp dir instead.
    const userDataDir = path.join(
      os.tmpdir(),
      "vscode-open-in-github-test-user-data"
    );

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [`--user-data-dir=${userDataDir}`],
    });
  } catch (err) {
    console.error(err);
    console.error("Failed to run tests");
    process.exit(1);
  }
}

main();
