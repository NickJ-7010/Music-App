import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

interface Download {
    id: string;
    title: string;
    artist: string;
    hasLyrics: boolean;
    album: string;
    duration: number;
    downloadDate: number;
    isAutomatic: boolean;
}

class Database {
	db!: SQLiteDatabase;
	awaitCallbacks: Function[];

	constructor() {
		this.awaitCallbacks = [];

		openDatabase({ name: 'main.db', location: 'default' }, database => {
			this.db = database;
            if (this.awaitCallbacks.length > 0) {
                this.awaitCallbacks.forEach(cb => cb(0));
            }
		});
	}

	awaitInit () {
        return new Promise(res => {
            if (this.db != undefined) return res(0);
            this.awaitCallbacks.push(res);
        });
    }

	async createTables() {
		await this.awaitInit();
		this.db.transaction(tx => {
			tx.executeSql(
			  'CREATE TABLE IF NOT EXISTS downloads (id TEXT PRIMARY KEY, title TEXT, artist TEXT, hasLyrics INTEGER, album TEXT, duration INTEGER, downloadDate INTEGER, isAutomatic INTEGER)',
			  [],
			  () => console.log('Downloads table created successfully'),
			  (tx, error) => {
                console.log('Error creating downloads table', error);
                return false;
              }
			);
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS history (rowid INTEGER PRIMARY KEY AUTOINCREMENT, songId TEXT, isResetPoint BOOLEAN)',
                [],
                () => console.log('History table created successfully'),
                (tx, error) => {
                    console.log('Error creating history table', error);
                    return false;
                }
            );
		});
	}

    async addDownload(song: Download) {
        await this.awaitInit();
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO downloads (id, title, artist, hasLyrics, album, duration, downloadDate, isAutomatic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [song.id, song.title, song.artist, song.hasLyrics ? 1 : 0, song.album, song.duration, song.downloadDate, song.isAutomatic ? 1 : 0],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            resolve(results);
                        } else {
                            reject(new Error('Failed to add download'));
                        }
                    },
                    (tx, error) => {
                        reject(error);
                        return false;
                    }
                );
            });
        });
    }
}

export default new Database();