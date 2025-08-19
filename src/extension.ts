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

        // Regex for common comment styles
        const singleLine = /\/\/.*$/gm;
        const hashLine = /#.*$/gm;
        const multiLine = /\/\*[\s\S]*?\*\//gm;

        let text = document.getText();

        // Remove based on language (basic coverage)
        if (['javascript', 'typescript', 'java', 'c', 'cpp', 'csharp'].includes(languageId)) {
            text = text.replace(singleLine, '').replace(multiLine, '');
        } else if (['python', 'shellscript', 'yaml'].includes(languageId)) {
            text = text.replace(hashLine, '');
        } else {
            // fallback: try both
            text = text.replace(singleLine, '').replace(hashLine, '').replace(multiLine, '');
        }

        // Replace full document
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length + 1)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, text);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
