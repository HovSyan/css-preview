export type UpdateMessage = {
    type: `hsam_update`;
    value: {
        docText: string;
        active: {
            selectors: [number, number];
            declarations: [number, number];
        }
    }
}

type HsamMessage = UpdateMessage;

function script() {
    const HSAM_PREFIX = 'hsam_';
    const USER_STYLES = 'user-styles';
    const ACTIVE_STYLES = 'active-styles';
    const PREVIEW = 'preview';
    const TARGET = 'target';
    const USER_SELECTORS = 'selectors';

    function isHsamEvent(e: unknown): e is HsamMessage {
        return !!e && typeof e === 'object' && 'type' in e && typeof e.type === 'string' && e.type.startsWith(HSAM_PREFIX);
    }

    function update({ value: { active: { selectors, declarations }, docText } }: UpdateMessage) {
        window.document.getElementById(USER_STYLES)!.innerText = `#${PREVIEW} { ${docText} }`;
        window.document.getElementById(USER_SELECTORS)!.innerText = docText.substring(selectors[0], selectors[1]);
        window.document.getElementById(ACTIVE_STYLES)!.innerText = `#${TARGET} ${docText.substring(declarations[0], declarations[1])}`;
    }

    window.addEventListener('message', (e) => {
        if (isHsamEvent(e.data)) {
            switch (e.data.type) {
                case 'hsam_update': {
                    update(e.data);
                    break;
                }
            }
        }
    });
}

export default `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style id="user-styles"></style>
    <style id="active-styles"></style>
</head>
<body>
    <h1>CSS preview</h1>
    <div id="selectors"></div>
    <div id="preview">
        <div id="target">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur omnis reiciendis sint! Nulla harum, exercitationem asperiores suscipit maxime delectus mollitia, sint quaerat vel doloribus laudantium porro assumenda, quae nostrum dolores.
        <div>
    </div>
    <script>${script.toString()};script()</script>
</body>
</html>
`;
