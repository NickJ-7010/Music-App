import TrackPlayer, { Capability, Event } from "react-native-track-player";
import { BrowseEndpoint, NextEndpoint, PlayerEndpoint } from "./YouTubeLib/core/endpoints";
import SearchSuggestionsSection from "./YouTubeLib/parser/classes/SearchSuggestionsSection";
import { ObservedArray } from "./YouTubeLib/parser/helpers";
import { HomeFeed, Search, TrackInfo } from "./YouTubeLib/parser/ytmusic";
import Innertube from "./YouTubeLib/platform/node";
import { generateRandomString } from "./YouTubeLib/utils/Utils";

class YoutubeManager {
    api!: Innertube;
    awaitCallbacks: Function[];
    backgroundUrl: any;
    player: {
        currentIndex: number;
        savedIndex: number;
        queue: any[];
        unshuffledQueue: any[];
        shuffled: boolean;
        loop: number;
        setState: Function;
    };
    playerControls: { previous: () => Promise<void>; next: () => Promise<void>; };

    constructor() {
        this.player = {
            currentIndex: 0,
            savedIndex: 0,
            queue: [],
            unshuffledQueue: [],
            shuffled: false,
            loop: 0,
            setState: () => { console.error('Called setState without initialized PlayerShelf'); }
        }; 

        this.awaitCallbacks = [];

        this.setup();

        this.playerControls = {
            next: async () => {
                await TrackPlayer.skipToNext();
            },
            previous: async () => {
                if ((await TrackPlayer.getProgress()).position >= 5) {
                    await TrackPlayer.seekTo(0);
                } else {
                    await TrackPlayer.skipToPrevious();
                }
            }
        };
    }

    async setup () {
        try {
            await TrackPlayer.setupPlayer();

            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Pause,
                    Capability.Play,
                    Capability.SeekTo,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious
                ]
            });
        } catch (e) { console.log(e) }

        this.api = await Innertube.create({ fetch: async (input: any, init?: RequestInit) => {
            //@ts-ignore
            return fetch(input.url ?? input, { ...init, method: input.method, reactNative: { textStreaming: true } });
        } });
        
        this.awaitCallbacks.forEach(callback => callback(0));
        this.awaitCallbacks = [];
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

    async getInfo (video_id: string): Promise<TrackInfo> {
        const player_payload = PlayerEndpoint.build({
            video_id,
            sts: this.api.session.player?.sts,
            client: 'YTMUSIC'
        });
      
        const next_payload = NextEndpoint.build({
            video_id,
            client: 'YTMUSIC'
        });
      
        const player_response = this.api.actions.execute(PlayerEndpoint.PATH, player_payload);
        const next_response = this.api.actions.execute(NextEndpoint.PATH, next_payload);
        const response = await Promise.all([ player_response, next_response ]);
      
        console.log(JSON.stringify(response));

        const cpn = generateRandomString(16);
      
        return new TrackInfo(response, this.api.actions, cpn);
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