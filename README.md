# Find Unused Files VSCode Extension

This Visual Studio Code (VSCode) extension helps you find unused files(Dead File) in your projects.

## Installation

You can install this extension directly from the Visual Studio Code Marketplace. Just search for "Find Unused Files".

## Usage

After installation, you can use the extension by following these steps:

1. Open your VSCode.
2. Use the shortcut `Cmd+Shift+P` on Mac or `Ctrl+Shift+P` on PC to open the Command Palette.
3. Type "`FUF: Find Unused Files`" and select the command.

The extension will then search your project for unused files and display a message with the results. The results will also be saved in a file named `unused-files-result.log` in your project root directory.

Additionally, you can add more file types for the extension to consider while searching for unused files:

1. Use the shortcut `Cmd+Shift+P` on Mac or `Ctrl+Shift+P` on PC to open the Command Palette.
2. Type "`FUF: Add File Type to Search Scope`" and select the command.
3. Enter the file types you want to add, separated by spaces. For example: ".md .txt .log"

The extension will then update the file types it searches for in your project.

You can also manually add or remove file types in the VSCode settings. Go to File > Preferences > Settings, search for "Find Unused Files", and then add or remove file types in the "File Type For Search Scope" field.

## Supported Projects

Currently, this extension supports .css, JavaScript (.js, .jsx) and TypeScript (.ts, .tsx) and Astro (.astro) projects for searching.

## File Types

This extension can search for the following file types:

.json
.jpg
.png
.gif
.bmp
.svg
.webp

You can add more file types using the "`FUF: Add File Type to Search Scope`" command as well as through the VSCode settings.
