const fs = require('fs-extra')
import JsTemplate from './jsTempl';
import HtmlTemplate from './htmlTempl';

const build = (data) => {
    data = JSON.parse(data);
    const components = {
        'componentCode': [],
        'componentVariables': [],
        'componentSubscribe': [],
        'componentUnsubscribe': []
    }
    const appPath = './WebApps/generated-app/',
        assetsPath = './src/assets/',
        jsFile = 'app.js',
        htmlFile = 'index.html',
        appinfoFile = 'appinfo.xml',
        controllerFiles = 'controller-files',
        fpComponents = 'fp-components',
        rwsApi = 'rws-api',
        icon = 'App_Default_100.png';

    data.forEach(component => {
        components.componentCode.push(JsTemplate.componentInit(component));
        components.componentVariables.push('var ' + component.id + ';');
        components.componentVariables.push('var ' + component.id + component.id + ';');
        components.componentSubscribe.push(JsTemplate.subscribe(component));
        components.componentUnsubscribe.push(JsTemplate.unsubscribe(component));
    });

    const jsTemplate = JsTemplate.injectTemplate(JsTemplate.stringJoin(components));
    const htmlTemplate = HtmlTemplate.injectTemplate(data);

    const appInfo = `<?xml version="1.0" encoding="UTF-8"?><WebApp><name>Generated APP</name><icon>App_Default_100.png</icon><path>index.html</path></WebApp>`;

    fsWrite(jsTemplate, appPath, jsFile);
    fsWrite(htmlTemplate, appPath, htmlFile);
    fsWrite(appInfo, appPath, appinfoFile);
    copyFiles(assetsPath + controllerFiles, appPath + controllerFiles);
    copyFiles(assetsPath + fpComponents, appPath + fpComponents);
    copyFiles(assetsPath + rwsApi, appPath + rwsApi);
    copyFiles(assetsPath + icon, appPath + icon);
};


// ================================================
//                  Utilities
// ================================================

const ensureDirectoryExistence = (appPath) => {
    if (!fs.existsSync(appPath)) {
        fs.mkdirSync(appPath, {recursive: true});
    }
}


// Write code to file and put it to the proper location
const fsWrite = (componentJs, appPath, jsFile) => {
    ensureDirectoryExistence(appPath);
    fs.writeFile(appPath + jsFile, componentJs, function (err) {
        if (err) return console.log(err);
        console.log('Done!');
    });
};


async function copyFiles(source, destination) {
    try {
        await fs.copy(source, destination)
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

export default {build};
