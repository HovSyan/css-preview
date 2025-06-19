import { TextEditor } from "vscode";
import { getCSSLanguageService, getSCSSLanguageService } from "vscode-css-languageservice";
import { CSS_LANG_ID, SCSS_LANG_ID } from "../constants";

const services = {
    [CSS_LANG_ID]: getCSSLanguageService(),
    [SCSS_LANG_ID]: getSCSSLanguageService(),
}

export const getRuleUnderCursor = (editor: TextEditor): cssls.RuleSet | undefined => {
    if (!(editor.document.languageId in services)) return;
    const service = services[editor.document.languageId as keyof typeof services];
    const offset = editor.document.offsetAt(editor.selection.active);
    const stylesheet = service.parseStylesheet(editor.document as any) as cssls.Stylesheet;
    const currentRuleset = stylesheet.children?.find((r) => r.offset <= offset && offset <= r.end && r.type === 3) as cssls.RuleSet;
    return recursivelyFindNestedRuleset(currentRuleset, offset);
};

const recursivelyFindNestedRuleset = (ruleset: cssls.RuleSet | undefined, offset: number) => {
    if (!ruleset) return;
    const nestedRuleset = ruleset.declarations.children.find((c) => c.offset <= offset && offset <= c.end && c.type === 3) as cssls.RuleSet;
    if (nestedRuleset) {
        return recursivelyFindNestedRuleset(nestedRuleset, offset);
    }
    return ruleset;
};