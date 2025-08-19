import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.removeComments', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor is active');
            return;
        }

        const document = editor.document;
        const languageId = document.languageId;

        // Regex patterns for common comment styles
        const singleLine = /^\s*\/\/.*$/;  // JS, TS, Java, C, C++
        const hashLine   = /^\s*#.*$/;     // Python, Shell, YAML

        // For multiline /* ... */, we'll track separately
        const multiLineStart = /\/\*/;
        const multiLineEnd   = /\*\//;

        let insideBlock = false;
        let newLines: string[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            const lineText = document.lineAt(i).text;

            // --- Multiline block comments ---
            if (insideBlock) {
                if (multiLineEnd.test(lineText)) {
                    insideBlock = false; // block ends
                }
                continue; // skip this line
            }
            if (multiLineStart.test(lineText)) {
                if (!multiLineEnd.test(lineText)) {
                    insideBlock = true; // block starts
                }
                continue; // skip this line
            }

            // --- Single line comments ---
            if (
                (['javascript','typescript','java','c','cpp','csharp'].includes(languageId) && singleLine.test(lineText)) ||
                (['python','shellscript','yaml'].includes(languageId) && hashLine.test(lineText))
            ) {
                continue; // skip comment line
            }

            // --- Non-comment line, keep it ---
            newLines.push(lineText);
        }

        // Replace full document with filtered lines
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, newLines.join("\n"));
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
