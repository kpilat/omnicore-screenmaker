const { dialog } = require('electron');
const fs = require('fs-extra')

const openDialog = async () => {
    try {
        return await dialog.showOpenDialog({ properties: ['openFile'] });
    } catch (e) {
        console.log(e);
    }
}

const saveDialog = async () => {
    try {
        return await dialog.showSaveDialog({ properties: ['createDirectory'] });
    } catch (e) {
        console.log(e);
    }
}


const ensureDirectoryExistence = (appPath) => {
    if (!fs.existsSync(appPath)) {
        fs.mkdirSync(appPath, {recursive: true});
    }
}


// Writes the code to the file and saves it to specified location
const fsWrite = (componentJs, appPath, jsFile) => {
    ensureDirectoryExistence(appPath);

    fs.writeFile(appPath + jsFile, componentJs, function (err) {
        if (err) return console.log(err);
        console.log('Done!');
    });
};

const fsRead = async (path) => {
    try {
        return await fs.readFile(path, 'utf8');
    } catch (e) {
        console.log(e);
    }
};


async function copyFiles(source, destination) {
    try {
        await fs.copy(source, destination)
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}


export default { openDialog, saveDialog, fsWrite, fsRead, copyFiles }