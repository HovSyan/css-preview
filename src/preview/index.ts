import * as vscode from "vscode";
import html from "./html";
import { getRuleUnderCursor } from "../adapters/css-ls.adapter";
import { debounce, toUpdateMessage } from "./utils";
import { INPUT_DEBOUNCE_TIME } from "../constants";

export class Preview {
    private _panel = null as null | vscode.WebviewPanel;
    private _prevDocText = "";

    update = debounce((editor: vscode.TextEditor) => {
        const docText = editor.document.getText();
        if (this._prevDocText === docText) {
            return;
        }
        this._prevDocText = docText;
        const rule = getRuleUnderCursor(editor);
        if (!rule) {
            return;
        }
        this._getOrCreatePanel()?.webview.postMessage(
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
        if (this._panel) {
            return this._panel;
        }
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
    };
}
