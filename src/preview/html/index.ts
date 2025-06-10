export type UpdateMessage = {
    type: `hsam_update`;
    value: {
        docText: string;
        active?: {
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

    function update({ value: { active, docText } }: UpdateMessage) {
        window.document.getElementById(USER_STYLES)!.textContent = `#${PREVIEW} { ${docText} }`;
        if (active) {
            const { selectors, declarations } = active;
            window.document.getElementById(USER_SELECTORS)!.replaceChildren(
                ...docText.substring(selectors[0], selectors[1]).split(',').map((s) => {
                    const node = document.createElement('span');
                    node.className = 'selector';
                    node.textContent = s.trim();
                    return node;
                })
            );
            window.document.getElementById(ACTIVE_STYLES)!.textContent = `#${TARGET} ${docText.substring(declarations[0], declarations[1])}`;
        } else {
            window.document.getElementById(USER_SELECTORS)!.replaceChildren();
            window.document.getElementById(ACTIVE_STYLES)!.textContent = '';
        }

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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <style>
    body {
        padding: unset;
        font-family: "Roboto", sans-serif;
    }
    .heading {
        margin: 0;
        padding: 20px;
        font-size: 16px;
        font-weight: 400;
        border-bottom: 1px solid currentColor;
    }
    .selectors-container {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 10px;
        min-height: 30px;
        border-bottom: 1px solid currentColor;

        .selectors-container__label {
            font-size: 14px;
        }

        #selectors {
            display: contents;
        }

        .selector {
            padding: 6px 16px;
            border: 1px solid currentColor;
            border-radius: 20px;
        }
    }
    </style>
    <style id="user-styles"></style>
    <style id="active-styles"></style>
</head>
<body>
    <h1 class="heading">CSS preview</h1>
    <div class="selectors-container">
        <span class="selectors-container__label">Selectors: </span>
        <div id="selectors"></div>
    </div>
    <div id="preview">
        <div id="target">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur omnis reiciendis sint! Nulla harum, exercitationem asperiores suscipit maxime delectus mollitia, sint quaerat vel doloribus laudantium porro assumenda, quae nostrum dolores.
        <div>
    </div>
    <script>${script.toString()};script()</script>
</body>
</html>
`;
