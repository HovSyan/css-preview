import { UpdateMessage } from "./html";

export const toUpdateMessage = (docText: string, rule: RuleSet): UpdateMessage => {
    const { selectors, declarations } =  rule;
    return { 
        type: 'hsam_update', 
        value: {
            docText,
            active: { 
                selectors: [selectors.offset, selectors.offset + selectors.length], 
                declarations: [declarations.offset, declarations.offset + declarations.length]
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