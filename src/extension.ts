import * as vscode from "vscode";
import { onActiveEditorChange, onEditorSelectionChange, onInit } from "./lifecycle";

export function activate(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(onEditorSelectionChange);
    vscode.window.onDidChangeActiveTextEditor(onActiveEditorChange);
    onInit(context);
}
