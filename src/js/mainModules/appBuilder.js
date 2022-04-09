const isDev = require('electron-is-dev');
const path = require('path')
import JsTemplate from './jsTempl';
import HtmlTemplate from './htmlTempl';
import FileManager from './fileManager';

const build = async (data) => {
    let appPath = './WebApps/generated-app/';
    const assetsPath = './src/assets/',
    jsFile = 'app.js',
    htmlFile = 'index.html',
    appinfoFile = 'appinfo.xml',
    controllerFiles = 'controller-files',
    fpComponents = 'fp-components',
    rwsApi = 'rws-api',
    icon = 'App_Default_100.png';

    if (!isDev) {
        const result = await FileManager.saveDialog();
    
        if(result.canceled) {
            return;
        } else {
            const filePath = path.dirname(result.filePath);
            const basename = path.basename(result.filePath);
            appPath = path.join(filePath, path.parse(basename).name, '/');
        }
    }
    
    data = JSON.parse(data);
    const components = {
        'componentCode': [],
        'componentVariables': [],
        'componentSubscribe': [],
        'componentUnsubscribe': []
    }

    console.log(data);

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

    FileManager.fsWrite(jsTemplate, appPath, jsFile);
    FileManager.fsWrite(htmlTemplate, appPath, htmlFile);
    FileManager.fsWrite(appInfo, appPath, appinfoFile);
    FileManager.copyFiles(assetsPath + controllerFiles, appPath + controllerFiles);
    FileManager.copyFiles(assetsPath + fpComponents, appPath + fpComponents);
    FileManager.copyFiles(assetsPath + rwsApi, appPath + rwsApi);
    FileManager.copyFiles(assetsPath + icon, appPath + icon);
};


// ================================================
//                  Utilities
// ================================================



export default {build};
