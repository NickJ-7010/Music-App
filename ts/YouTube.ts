import Innertube from "./YouTubeLib/platform/node";

class YoutubeManager {
    api: Innertube | undefined;
    awaitCallbacks: Function[];

    constructor() {
        this.awaitCallbacks = [];

        Innertube.create({ fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
            //@ts-ignore
            return fetch(input.url ?? input, { ...init, method: input.method, reactNative: { textStreaming: true } });
        } }).then(val => {
            this.api = val;
            this.awaitCallbacks.forEach(callback => callback(0));
            this.awaitCallbacks = [];
        })
    }

    awaitInit () {
        return new Promise(res => {
            if (this.api != undefined) return res(0);
            this.awaitCallbacks.push(res);
        });
    }

    getSearchSuggestions (query: string) {
        return new Promise(async (res, rej) => {
            await this.awaitInit();
            res(await this.api?.music.getSearchSuggestions(query));
        });
    }
}

export default new YoutubeManager();