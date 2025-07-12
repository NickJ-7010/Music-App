
import RNFS from 'react-native-fs';
import database from './Database';

interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    artworkUrl: string;
    hasLyrics: boolean;
}

export const downloadSong = async (song: Song, url: string, isAutomatic: boolean = false) => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${song.id}.mp3`;

    const options: RNFS.DownloadFileOptions = {
        fromUrl: url,
        toFile: filePath,
        background: true,
        begin: (res) => {
            console.log('Download has begun', res);
        },
        progress: (res) => {
            let progressPercent = (res.bytesWritten / res.contentLength) * 100;
            console.log(`Download progress: ${progressPercent.toFixed(2)}%`);
        }
    };

    try {
        const result = await RNFS.downloadFile(options).promise;

        if (result.statusCode === 200) {
            console.log('File downloaded successfully to:', filePath);

            await database.addDownload({
                ...song,
                downloadDate: Math.floor(Date.now() / 1000),
                isAutomatic: isAutomatic
            });

        } else {
            console.error('Download failed with status code:', result.statusCode);
        }
    } catch (err) {
        console.error('Download error:', err);
    }
};
