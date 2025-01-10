import RNFS from 'react-native-fs';

class Logger {
    constructor () { }

    log (log: any) {
        const now = new Date();
        const logText = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} [${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]: ${log}\n`;

        console.log(logText);
        RNFS.appendFile(RNFS.DocumentDirectoryPath + '/log.txt', logText, 'utf8');
    }

    error ({ error: error }: { error: any }) {
        const now = new Date();
        const logText = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} [${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]: (Error) ${error}\n`;

        console.log(logText);
        RNFS.appendFile(RNFS.DocumentDirectoryPath + '/log.txt', logText, 'utf8');
    }
}

export default new Logger();