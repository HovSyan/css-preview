export const EXTENSION_NAME = 'css-preview';
export const CSS_LANG_ID = 'css';
export const SCSS_LANG_ID = 'scss';
export const SUPPORTED_LANGUAGES = [CSS_LANG_ID, SCSS_LANG_ID];
export const INPUT_DEBOUNCE_TIME = 200;
export const COMMANDS = {
    ENABLE: `${EXTENSION_NAME}.enable`,
    DISABLE: `${EXTENSION_NAME}.disable`
};
export const EXTENSION_STATE = {
    enabled: {
        keyName: 'enabled',
        defaultValue: true
    }
} as const;