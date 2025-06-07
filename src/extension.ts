import { getCSSLanguageService } from 'vscode-css-languageservice';
import * as vscode from "vscode";

const cssService = getCSSLanguageService();
// TODO: make separate panel handler
let panel = null as null | vscode.WebviewPanel;

// TODO: utilize context argument
export function activate(context: vscode.ExtensionContext) {
    // TODO: optimize not to change if no change + debounce + post message
    const update = (editor: vscode.TextEditor) => {
        const offset = editor.document.offsetAt(editor.selection.active);
        const stylesheet = cssService.parseStylesheet(editor.document as any) as Stylesheet;
        const { selectors, declarations } = stylesheet.children.find((r) => r.offset <= offset && offset <= r.end)!;
        const selectorsStr = stylesheet.textProvider(selectors.offset, selectors.length).replaceAll('\n', ' ');
        const declarationsStr = stylesheet.textProvider(declarations.offset, declarations.length);
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
    <style>
        [data-host] ${declarationsStr};
    </style>
</head>
<body>
    <div>Selectors: ${selectorsStr}</div>
    <div>Declarations: ${declarationsStr}</div>
    <div>
        <div data-host>
            Lorem ipsum
        <div>
    </div>
</body>
</html>
`;
    };

    vscode.window.onDidChangeTextEditorSelection((e) => {
        update(e.textEditor);
    });

    vscode.window.onDidChangeActiveTextEditor((e) => {
        // TODO: no constant literals
        e && e.document.languageId === "css"
            ? update(e)
            : panel?.dispose();
    });

    // TODO: move to init logic
    update(vscode.window.activeTextEditor!);
}
