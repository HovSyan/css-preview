import * as vscode from "vscode";
import html from "./html";
import { getRuleUnderCursor } from "../adapters/css-ls.adapter";
import { debounce, toUpdateMessage } from "./utils";
import { INPUT_DEBOUNCE_TIME } from "../constants";

export class Preview {
    private _panel = null as null | vscode.WebviewPanel;

    update = debounce((editor: vscode.TextEditor) => {
        const docText = editor.document.getText();
        const rule = getRuleUnderCursor(editor);
        this._getOrCreatePanel().webview.postMessage(
            toUpdateMessage(docText, rule)
        );
    }, INPUT_DEBOUNCE_TIME);

    close = () => {
        this._panel?.dispose();
    };

    dispose = this.close;

    private _onDispose = () => {
        this._panel = null;
    };

    private _getOrCreatePanel = () => {
        if (!this._panel) {
            this._panel = vscode.window.createWebviewPanel(
                "css",
                "Preview",
                {
                    viewColumn: vscode.ViewColumn.Beside,
                    preserveFocus: true,
                },
                { enableScripts: true }
            );
            this._panel.onDidDispose(this._onDispose);
            this._panel.webview.html = html;
        }
        return this._panel;
    };
}
