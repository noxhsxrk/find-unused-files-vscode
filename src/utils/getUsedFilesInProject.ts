import * as vscode from "vscode";
import fs from "fs";
import path from "path";

import excludedDirectories from "../constants/excludedDirectories";
import excludedFiles from "../constants/excludedFiles";
import extensionsToFind from "../constants/extensionsToFind";
import supportExtensions from "../constants/supportExtensions";
import getExtensionRegex from "./getExtensionRegex";

const processFile = (filePath: string, usedFilesList: string[]): string[] => {
  let content = fs.readFileSync(filePath, "utf-8");
  let stringRegex = getExtensionRegex(extensionsToFind);
  let stringMatch;
  while ((stringMatch = stringRegex.exec(content))) {
    if (vscode.workspace.workspaceFolders) {
      const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
      usedFilesList.push(path.resolve(rootPath, stringMatch[1]));
    }
  }
  return usedFilesList;
};

const getUsedFilesInProject = (
  dir: string,
  usedFilesList: string[]
): string[] => {
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (
      fs.statSync(filePath).isDirectory() &&
      !excludedDirectories.includes(file)
    ) {
      usedFilesList = getUsedFilesInProject(filePath, usedFilesList);
    } else if (
      supportExtensions.includes(path.extname(file)) &&
      !excludedFiles.includes(file)
    ) {
      usedFilesList = processFile(filePath, usedFilesList);
    }
  });
  return usedFilesList;
};

export default getUsedFilesInProject;
