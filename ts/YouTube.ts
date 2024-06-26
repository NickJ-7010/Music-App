import TrackPlayer, { Capability, State } from "react-native-track-player";
import { BrowseEndpoint } from "./YouTubeLib/core/endpoints";
import SearchSuggestionsSection from "./YouTubeLib/parser/classes/SearchSuggestionsSection";
import { ObservedArray } from "./YouTubeLib/parser/helpers";
import { HomeFeed, Search, TrackInfo } from "./YouTubeLib/parser/ytmusic";
import Innertube from "./YouTubeLib/platform/node";
import ImageColors from "react-native-image-colors";

class YoutubeManager {
    api!: Innertube;
    awaitCallbacks: Function[];
    backgroundUrl: any;
    player: {
        currentIndex: number;
        savedIndex: number;
        queue: MusicTrackInfo[];
        unshuffledQueue: MusicTrackInfo[];
        shuffled: boolean;
        loop: number;
        autoplay: boolean;
        setState: (stateNumber: number) => void;
        jumpPlayer: (pos: number) => void;
    };
    playerControls: { onTrackEnd: () => Promise<void>; play: () => Promise<void>; previous: () => Promise<void>; next: () => Promise<void>; };

    constructor() {
        this.player = {
            currentIndex: 0,
            savedIndex: 0,
            queue: [],
            unshuffledQueue: [],
            shuffled: false,
            loop: 0,
            autoplay: false,
            setState: () => { console.error('Called setState without initialized PlayerShelf'); },
            jumpPlayer: () => { console.error('Called setPlayerState without initialized PlayerShelf'); }
        }; 

        this.awaitCallbacks = [];

        this.setup();

        this.playerControls = {
            onTrackEnd: async () => {
                const state = await TrackPlayer.getPlaybackState();

                if (this.player.currentIndex == this.player.queue.length - 1 && !this.player.autoplay) {
                    if (state.state == State.Playing) {
                        await TrackPlayer.pause(); //@ts-ignore
                        await TrackPlayer.seekTo(this.player.queue[this.player.currentIndex].track.basic_info.duration);
                        this.registerMetadata();
                    }
                }
            },
            play: async () => {

            },
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

    async getInfo (video_id: string): Promise<MusicTrackInfo> {
        const track = await this.api.music.getInfo(video_id);

        //@ts-ignore
        return { colors: await ImageColors.getColors(track.basic_info.thumbnail[0].url, { }), track };
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

    async registerMetadata () {
        await TrackPlayer.updateMetadataForTrack(0, {
            title: this.player.queue[this.player.currentIndex].track.basic_info.title,
            artist: this.player.queue[this.player.currentIndex].track.basic_info.author, //@ts-ignore
            artwork: this.player.queue[this.player.currentIndex].track.basic_info.thumbnail[0].url,
            duration: this.player.queue[this.player.currentIndex].track.basic_info.duration
        });
    }
}

interface MusicTrackInfo {
    colors: any;
    track: TrackInfo
}

export default new YoutubeManager();