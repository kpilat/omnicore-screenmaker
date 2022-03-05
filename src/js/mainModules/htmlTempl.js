const injectTemplate = (components) => {
    let elements = '';

    components.forEach((component) => {
        elements += `
            <div id="${component.id}" style="position: absolute; top:${component.top}; left:${component.left}"></div>
        `
    });

    const template = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Generated APP</title>
        
<!--            <link rel="stylesheet" type="text/css" href="app.css" />-->
        
            <!-- include used components -->
            <script src="fp-components/fp-components-common.js"></script>
            <script src="fp-components/fp-components-button-a.js"></script>
            <script src="fp-components/fp-components-popup-a.js"></script>
            <script src="fp-components/fp-components-menu-a.js"></script>
            <script src="fp-components/fp-components-digital-a.js"></script>
            <script src="fp-components/fp-components-switch-a.js"></script>
            <script src="fp-components/fp-components-input-a.js"></script>
            <script src="fp-components/fp-components-linechart-a.js"></script>
            <script src="fp-components/fp-components-dropdown-a.js"></script>
            <script src="fp-components/fp-components-toggle-a.js"></script>
        
            <!-- include RWS api -->
            <script src="rws-api/omnicore-rws.js"></script>
            <script src="rws-api/omnicore-app.js"></script>
        
            <!-- include app javascript -->
            <script src="app.js"></script>
        </head>

        <body style="display: flex;
                    flex-direction: row;
                    height: 680px;
                    width: 1026px;">
            <div class="content" id="io-view" style="position: relative;
                                                    flex-direction: column;
                                                    justify-content: flex-start;
                                                    align-items: flex-start;
                                                    padding: 30px;
                                                    flex: 1 1 auto;">
                ${elements}
            </div>
        </body>
        </html>
    `;

    return template;
}

export default {injectTemplate}