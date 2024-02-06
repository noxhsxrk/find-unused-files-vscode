import * as vscode from "vscode";

import getFilesInProjectByExtension from "./utils/getFilesInProjectByExtension";
import getUsedFilesInProject from "./utils/getUsedFilesInProject";

const getWebViewContent = (unusedFiles: string[]): string => {
  const fileItems = unusedFiles
    .map((file) => `<li><span>${file}</span></li>`)
    .join("");

  return `
    <html>
      <head>
        <style>
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin-bottom: 5px;
          }
          .rerun {
            color: #007acc;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>Unused Files:</h1>
        <span class="rerun" onclick="rerunCommand()">Rerun</span>
        <ul>
          ${fileItems}
        </ul>
        <script>
          const vscode = acquireVsCodeApi();

          function rerunCommand() {
            vscode.postMessage({ command: 'rerun' });
          }
        </script>
      </body>
    </html>
  `;
};

let currentPanel: vscode.WebviewPanel | undefined;

export const activate = (context: vscode.ExtensionContext): void => {
  let disposableFind = vscode.commands.registerCommand(
    "find-unused-files.FindUnusedFiles",
    async function () {
      const rootPath = vscode.workspace.rootPath;

      if (rootPath) {
        let files = getFilesInProjectByExtension(rootPath, []);
        let usedResources = getUsedFilesInProject(rootPath, []);

        let unusedFiles = [];

        const progress = vscode.window.createStatusBarItem(
          vscode.StatusBarAlignment.Left,
          -1000
        );
        progress.text = "Finding unused files...";
        progress.show();

        for (const file of files) {
          progress.text = `Finding unused files: (${file})`;

          const isUnused = !usedResources.some((usedFile) =>
            usedFile.includes(file)
          );

          if (isUnused) {
            unusedFiles.push(file);
          }

          await new Promise((resolve) => setTimeout(resolve, 1));
        }

        progress.hide();

        if (!unusedFiles.length) {
          vscode.window.showInformationMessage("No unsued files found 😃");
        } else {
          if (currentPanel) {
            currentPanel.dispose();
          }

          currentPanel = vscode.window.createWebviewPanel(
            "unusedFiles",
            "Unused Files",
            vscode.ViewColumn.Beside,
            {
              enableScripts: true,
            }
          );

          currentPanel.webview.html = getWebViewContent(unusedFiles);
          currentPanel.onDidDispose(() => {
            currentPanel = undefined;
          });

          currentPanel.webview.onDidReceiveMessage((message) => {
            if (message.command === "rerun") {
              vscode.commands.executeCommand(
                "find-unused-files.FindUnusedFiles"
              );
            }
          });
        }
      }
    }
  );

  context.subscriptions.push(disposableFind);
};

export function deactivate() {}
