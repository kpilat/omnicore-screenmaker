const path = require('path')
import FileManager from "./fileManager";

const save = async (data) => {
    const extension = '.json'
    const result = await FileManager.saveDialog();
    if(result.canceled) {
        return;
    } else {
        const filePath = path.dirname(result.filePath) + '/';
        const basename = path.parse(path.basename(result.filePath)).name;
        FileManager.fsWrite(data, filePath, basename + extension);
    }
}

const load = async () => {
    const result = await FileManager.openDialog();
    if(result.canceled) {
        return;
    } else {
        return await FileManager.fsRead(result.filePaths[0]);
    }
}


export default { save, load };