import { TextEditor } from "vscode";
import { getCSSLanguageService } from "vscode-css-languageservice";

const cssService = getCSSLanguageService();

export const getRuleUnderCursor = (editor: TextEditor): cssls.RuleSet | undefined => {
    const offset = editor.document.offsetAt(editor.selection.active);
    const stylesheet = cssService.parseStylesheet(editor.document as any) as cssls.Stylesheet;
    return stylesheet.children?.find((r) => r.offset <= offset && offset <= r.end);
};
