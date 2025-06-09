import { getCSSLanguageService } from 'vscode-css-languageservice';
import html, { UpdateMessage } from './preview/index.html';
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
        const rule = stylesheet.children?.find((r) => r.offset <= offset && offset <= r.end);
        if (!rule) { return; }
        const { selectors, declarations } =  rule;
        if (!panel) {
            panel = vscode.window.createWebviewPanel("css", "Preview", {
                viewColumn: vscode.ViewColumn.Beside,
                preserveFocus: true,
            }, { enableScripts: true });
            panel.onDidDispose(() => (panel = null));
            panel.webview.html = html;
        }
        panel.webview.postMessage({ 
            type: 'hsam_update', 
            value: {
                docText: stylesheet.textProvider(),
                active: { 
                    selectors: [selectors.offset, selectors.offset + selectors.length], 
                    declarations: [declarations.offset, declarations.offset + declarations.length]
                }
             }
        } as UpdateMessage);
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
