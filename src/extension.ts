import * as vscode from "vscode";
import fs from "fs";
import path from "path";

import getFilesInProjectByExtension from "./utils/getFilesInProjectByExtension";
import getUsedFilesInProject from "./utils/getUsedFilesInProject";

export const activate = (context: vscode.ExtensionContext): void => {
  let disposable = vscode.commands.registerCommand(
    "find-unused-files.FindUnusedFiles",
    function () {
      const rootPath = vscode.workspace.rootPath;

      if (rootPath) {
        let files = getFilesInProjectByExtension(rootPath, []);
        let usedResources = getUsedFilesInProject(rootPath, []);

        let unusedFiles = files.filter(
          (file: string) =>
            !usedResources.some((usedFile) => usedFile.includes(file))
        );

        vscode.window.showInformationMessage(
          `Unused files: ${unusedFiles.join(", ")}`
        );

        fs.writeFileSync(
          path.join(rootPath, "unused-files-result.log"),
          unusedFiles.join("\n")
        );
      }
    }
  );

  context.subscriptions.push(disposable);
};

export function deactivate() {}
