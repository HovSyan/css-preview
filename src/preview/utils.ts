import { UpdateMessage } from "./html";

export const toUpdateMessage = (docText: string, rule: cssls.RuleSet | undefined): UpdateMessage => {
    return { 
        type: 'hsam_update', 
        value: {
            docText,
            active: rule && { 
                selectors: [rule.selectors.offset, rule.selectors.offset + rule.selectors.length], 
                declarations: [rule.declarations.offset, rule.declarations.offset + rule.declarations.length]
            }
        }
    };
};

export const debounce = <T extends (...args: any[]) => any>(cb: T, timeout = 0) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => cb(...args), timeout); 
    };
};