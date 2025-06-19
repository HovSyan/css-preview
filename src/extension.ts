import * as vscode from "vscode";
import { onActiveEditorChange, onEditorSelectionChange, onExtensionEnabledStateChange, onInit } from "./lifecycle";
import { COMMANDS } from "./constants";
import { GlobalState } from "./global-state";

export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(onEditorSelectionChange);
    vscode.window.onDidChangeActiveTextEditor(onActiveEditorChange);
    onInit(context);
    context.subscriptions.push(
        vscode.commands.registerCommand(COMMANDS.ENABLE, () => onExtensionEnabledStateChange(true)),
        vscode.commands.registerCommand(COMMANDS.DISABLE, () => onExtensionEnabledStateChange(false))
    );
}
