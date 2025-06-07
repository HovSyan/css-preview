import { getCSSLanguageService } from 'vscode-css-languageservice';
import * as vscode from "vscode";

const cssService = getCSSLanguageService();
// TODO: make separate panel handler
let panel = null as null | vscode.WebviewPanel;

// TODO: utilize context argument
export function activate(context: vscode.ExtensionContext) {
    const update = (styles: string) => {
        if (!panel) {
            panel = vscode.window.createWebviewPanel("css", "Preview", {
                viewColumn: vscode.ViewColumn.Beside,
                preserveFocus: true,
            }, { enableScripts: true });
            panel.onDidDispose(() => (panel = null));
        }
        // TODO: move to separate function/module
        panel.webview.html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>${styles}</style>
</head>
<body>Hello World</body>
</html>
`;
    };

    vscode.workspace.onDidChangeTextDocument((e) => {
        update(e.document.getText());
    });

    vscode.window.onDidChangeActiveTextEditor((e) => {
        // TODO: no constant literals
        e && e.document.languageId === "css"
            ? update(e.document.getText())
            : panel?.dispose();
    });

    // TODO: move to init logic
    update(vscode.window.activeTextEditor?.document.getText() || "");
}
