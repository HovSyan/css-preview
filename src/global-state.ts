import { ExtensionContext } from "vscode";
import { EXTENSION_STATE } from "./constants";

class _GlobalState {
    private _context: ExtensionContext | null = null;

    readonly extensionEnabled = EXTENSION_STATE.enabled.defaultValue;

    registerContext(context: ExtensionContext) {
        this._context = context;
        this._updateState();
    }

    setExtensionEnabled(value: boolean) {
        assertContextExists(this._context);
        this._context.globalState.update(
            EXTENSION_STATE.enabled.keyName,
            value
        );
        this._updateState();
    }

    private _updateState() {
        assertContextExists(this._context);
        Object.assign(this, {
            extensionEnabled:
                this._context.globalState.get(
                    EXTENSION_STATE.enabled.keyName
                ) ?? EXTENSION_STATE.enabled.defaultValue,
        });
    }
}

function assertContextExists(
    context: ExtensionContext | null
): asserts context is ExtensionContext {
    if (!context) {
        throw new Error("Expected context to exist");
    }
}

export const GlobalState = new _GlobalState();
