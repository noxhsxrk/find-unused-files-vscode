import * as vscode from "vscode";

const getConfigFileTypes = (): string[] => {
  const config = vscode.workspace.getConfiguration("find-unused-files");
  const extensionsToFind: string[] = config.get("fileType", []);

  return extensionsToFind;
};

export default getConfigFileTypes;
