import * as vscode from "vscode";
import { SUPPORTED_LANGUAGES } from "./constants";
import { Preview } from "./preview";
import { GlobalState } from "./global-state";

const preview = new Preview();

export const onInit = (context: vscode.ExtensionContext) => {
    GlobalState.registerContext(context);
    tryUpdatePreview();
    context.subscriptions.push(preview);
};

export const onActiveEditorChange = (e: vscode.TextEditor | undefined) => tryUpdatePreview(e);

export const onEditorSelectionChange = (e: vscode.TextEditorSelectionChangeEvent) => tryUpdatePreview(e.textEditor);

export const onExtensionEnabledStateChange = (enabled: boolean) => {
    GlobalState.setExtensionEnabled(enabled);
    tryUpdatePreview();
};

const tryUpdatePreview = (e = vscode.window.activeTextEditor) => {
    if (GlobalState.extensionEnabled && e && SUPPORTED_LANGUAGES.includes(e.document.languageId)) {
        preview.update(e);
    } else {
        preview.close();
    }
};
