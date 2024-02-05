import * as vscode from "vscode";
import fs from "fs";
import path from "path";

import getFilesInProjectByExtension from "./utils/getFilesInProjectByExtension";
import getUsedFilesInProject from "./utils/getUsedFilesInProject";

export const activate = (context: vscode.ExtensionContext): void => {
  let disposableFind = vscode.commands.registerCommand(
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

  let disposableAdd = vscode.commands.registerCommand(
    "find-unused-files.AddFileTypeToSearchScope",
    async function () {
      const fileType = await vscode.window.showInputBox({
        prompt:
          'Enter the file types to add separated by space. For example: ".md .txt .log"',
      });

      if (fileType) {
        const config = vscode.workspace.getConfiguration("find-unused-files");
        let fileTypes: string[] = config.get("fileType", []);

        fileTypes = [...fileTypes, ...fileType.split(" ")];
        await config.update(
          "fileType",
          fileTypes,
          vscode.ConfigurationTarget.Global
        );

        vscode.window.showInformationMessage(
          "File types updated successfully."
        );
      }
    }
  );

  context.subscriptions.push(disposableFind, disposableAdd);
};

export function deactivate() {}
