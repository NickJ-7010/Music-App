import { BrowseEndpoint } from "./YouTubeLib/core/endpoints";
import SearchSuggestionsSection from "./YouTubeLib/parser/classes/SearchSuggestionsSection";
import { ObservedArray } from "./YouTubeLib/parser/helpers";
import { HomeFeed, Search } from "./YouTubeLib/parser/ytmusic";
import Innertube from "./YouTubeLib/platform/node";

class YoutubeManager {
    api!: Innertube;
    awaitCallbacks: Function[];
    backgroundUrl: any;

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

    async getSearchSuggestions (query: string): Promise<ObservedArray<SearchSuggestionsSection>> {
        await this.awaitInit();
        return await this.api.music.getSearchSuggestions(query);
    }

    async getSearch (query: string): Promise<Search> {
        await this.awaitInit();
        return await this.api.music.search(query);
    }

    async getHome (updateBackground: boolean): Promise<HomeFeed> {
        await this.awaitInit();
        const res = await this.api.actions.execute('/browse', BrowseEndpoint.build({
            browse_id: 'FEmusic_home',
            client: 'YTMUSIC'
        }));

        if (updateBackground) this.backgroundUrl = res.data.background.musicThumbnailRenderer.thumbnail.thumbnails[0].url;
        
        return new HomeFeed(res, this.api.actions);
    }
}

export default new YoutubeManager();