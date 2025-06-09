import * as vscode from "vscode";
import { CSS_LANG_ID } from "./constants";
import { Preview } from "./preview";

const preview = new Preview();

export const onInit = (context: vscode.ExtensionContext) => {
    preview.update(vscode.window.activeTextEditor!);
    context.subscriptions.push(preview);
};

export const onActiveEditorChange = (e: vscode.TextEditor | undefined) => {
    if (e && e.document.languageId === CSS_LANG_ID) {
        preview.update(e);
    } else {
        preview.close();
    }
};

export const onEditorSelectionChange = (e: vscode.TextEditorSelectionChangeEvent) => {
    preview.update(e.textEditor);
};
