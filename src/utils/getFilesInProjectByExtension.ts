import fs from "fs";
import path from "path";

import excludedDirectories from "../constants/excludedDirectories";
import excludedFiles from "../constants/excludedFiles";
import getConfigFileTypes from "../constants/extensionsToFind";

const getFilesInProjectByExtension = (
  dir: string,
  fileList: string[]
): string[] => {
  let files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (!excludedDirectories.includes(file)) {
        fileList = getFilesInProjectByExtension(path.join(dir, file), fileList);
      }
    } else {
      if (
        getConfigFileTypes().includes(path.extname(file)) &&
        !excludedFiles.includes(file)
      ) {
        fileList.push(file);
      }
    }
  });
  return fileList;
};

export default getFilesInProjectByExtension;
