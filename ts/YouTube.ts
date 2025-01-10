import 'event-target-polyfill';
import TrackPlayer, { Capability, State } from "react-native-track-player";
import SearchSuggestionsSection from "../node_modules/youtubei.js/dist/src/parser/classes/SearchSuggestionsSection";
import Innertube, { UniversalCache, YTMusic, Helpers, Endpoints } from "youtubei.js";
import ImageColors from "react-native-image-colors";
import { PixelRatio } from 'react-native';
import RNFS from 'react-native-fs';
import Logger from './Logger';

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
        cache: {
            playerColor: string;
        }
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
            cache: {
                playerColor: "008947"
            },
            setState: () => { console.error('Called setState without initialized PlayerShelf'); },
            jumpPlayer: () => { console.error('Called setPlayerState without initialized PlayerShelf'); }
        }; 

        this.awaitCallbacks = [];

        this.setup();

        this.playerControls = {
            onTrackEnd: async () => {
                const state = await TrackPlayer.getPlaybackState();

                Logger.log(JSON.stringify(state));

                if (state.state == State.Playing) {
                    if (this.player.loop == 2) {
                        await TrackPlayer.seekTo(0);
                        await TrackPlayer.play();
                    } else if (this.player.currentIndex == this.player.queue.length - 1) {
                        if (this.player.loop == 1) {
                            await TrackPlayer.pause();
                            this.player.currentIndex = 0;
                            await this.playerControls.play();
                        } else if (this.player.autoplay) {
                            // TODO: Handle autoplay next video
                        } else {
                            await TrackPlayer.pause(); //@ts-ignore
                            await TrackPlayer.seekTo(this.player.queue[this.player.currentIndex].track.duration);
                            this.registerMetadata();
                        }
                    } else {
                        await TrackPlayer.pause();
                        this.player.currentIndex++;
                        await this.playerControls.play();
                    }
                }
            },
            play: async () => {
                if (!this.player.queue[this.player.currentIndex].track.id) return;

                Logger.log(`Playing video: ${this.player.queue[this.player.currentIndex].track.id}`);

                const info = await this.getInfo(this.player.queue[this.player.currentIndex].track.id ?? '');
                
                console.log(JSON.stringify(info));

                const colorData = this.player.queue[this.player.currentIndex]?.colors;
                const colors = [colorData?.background, colorData?.primary, colorData?.secondary, colorData?.detail];
                let color = colors[0];
                
                if (color) {
                    for (var i = 1; i < colors.length; i++) {
                        const a = getRGB(parseInt(color.slice(1), 16));
                        const b = getRGB(parseInt(colors[i].slice(1), 16));
                        if ((b.r + b.g + b.b) / 3 < (a.r + a.g + a.b) / 3) {
                            color = colors[i];
                        }
                    }
                }

                this.player.cache.playerColor = color.slice(1);

                await TrackPlayer.setQueue([{
                    url: info.url,
                    title: info.track.basic_info.title,
                    artist: info.track.basic_info.author, //@ts-ignore
                    artwork: this.getThumbnail(this.player.queue[this.player.currentIndex].track.thumbnail, -1).url,
                    duration: info.track.basic_info.duration
                }]);
                
                await TrackPlayer.seekTo(0);
                await TrackPlayer.play();
            },
            next: async () => {
                if (this.player.currentIndex == this.player.queue.length - 1) {
                    if (this.player.loop) {
                        this.player.currentIndex = 0;
                    } else {
                        // TODO: Handle autoplay next video
                        this.player.currentIndex = 0;
                    }
                } else {
                    this.player.currentIndex++;
                }
                await this.playerControls.play();
            },
            previous: async () => {
                if ((!this.player.currentIndex && !this.player.loop) || (await TrackPlayer.getProgress()).position >= 5) {
                    await TrackPlayer.seekTo(0);
                } else {
                    this.player.currentIndex--;
                    await this.playerControls.play();
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
        } catch (e) { Logger.error({ error: e }); }

        Logger.log("(Setup) App started up");

        this.api = await Innertube.create({
            cache: new UniversalCache(false),
            generate_session_locally: true,
        });

        this.awaitCallbacks.forEach(callback => callback(0));
        this.awaitCallbacks = [];
    }

    resetPlayer() {
        this.player.currentIndex = 0;
        this.player.savedIndex = 0;
        this.player.queue = [];
        this.player.unshuffledQueue = [];
        this.player.shuffled = false;
    }

    awaitInit () {
        return new Promise(res => {
            if (this.api != undefined) return res(0);
            this.awaitCallbacks.push(res);
        });
    }

    async getSearchSuggestions (query: string): Promise<Helpers.ObservedArray<SearchSuggestionsSection>> {
        await this.awaitInit();
        return await this.api.music.getSearchSuggestions(query);
    }

    async getSearch (query: string): Promise<YTMusic.Search> {
        await this.awaitInit();
        return await this.api.music.search(query);
    }

    async getInfo (video_id: string): Promise<{ url: string, colors: any, track: YTMusic.TrackInfo }> {
        const track = await this.api.music.getInfo(video_id);

        const response = await this.api.actions.execute(Endpoints.PlayerEndpoint.PATH, Endpoints.PlayerEndpoint.build({
            video_id,
            sts: this.api.session.player?.sts,
            client: 'iOS'
        }));

        //@ts-ignore
        return { url: response.data?.streamingData?.hlsManifestUrl, colors: await ImageColors.getColors(this.getThumbnail(track.basic_info.thumbnail, 50).url, { }), track };
    }

    async getArtist (artist_id: string): Promise<YTMusic.Artist> {
        return await this.api.music.getArtist(artist_id);
    }
    
    async getAlbum (album_id: string): Promise<YTMusic.Album> {
        return await this.api.music.getAlbum(album_id);
    }

    async getPlaylist (playlist_id: string): Promise<YTMusic.Playlist> {
        return await this.api.music.getPlaylist(playlist_id);
    }

    async getCredits (endpoint: string) {
        return await this.api.actions.execute('/browse', Endpoints.BrowseEndpoint.build({
            browse_id: endpoint,
            client: 'YTMUSIC'
        }));
    }

    async getHome (updateBackground: boolean): Promise<YTMusic.HomeFeed> {
        await this.awaitInit();
        const res = await this.api.actions.execute('/browse', Endpoints.BrowseEndpoint.build({
            browse_id: 'FEmusic_home',
            client: 'YTMUSIC'
        }));

        // TODO: Add code for caching the image for offline functionality
        if (updateBackground) this.backgroundUrl = res.data.background?.musicThumbnailRenderer.thumbnail.thumbnails[0].url;

        return new YTMusic.HomeFeed(res, this.api.actions);
    }

    async registerMetadata () {
        await TrackPlayer.updateMetadataForTrack(0, {
            title: this.player.queue[this.player.currentIndex].track.title,
            artist: this.player.queue[this.player.currentIndex].track.author, //@ts-ignore
            artwork: this.getThumbnail(this.player.queue[this.player.currentIndex].track.thumbnail, -1).url,
            duration: this.player.queue[this.player.currentIndex].track.duration
        });
    }

    async handlePress (data: any, navigation: any, id_overwrite?: any) {
        const endpoint = data.endpoint ?? data.overlay?.content?.endpoint ?? data.on_tap;
    
        if (endpoint.metadata.api_url == '/player') {
            const info = await this.getInfo(id_overwrite ?? endpoint.payload.videoId);
        
            const colors = [info.colors?.background, info.colors?.primary, info.colors?.secondary, info.colors?.detail];
            let color = colors[0];
            
            if (color) {
                for (var i = 1; i < colors.length; i++) {
                    const a = getRGB(parseInt(color.slice(1), 16));
                    const b = getRGB(parseInt(colors[i].slice(1), 16));
                    if ((b.r + b.g + b.b) / 3 < (a.r + a.g + a.b) / 3) {
                        color = colors[i];
                    }
                }
            }

            this.player.cache.playerColor = info.colors.primary.slice(1);

            this.resetPlayer();
            this.player.queue = [{
                colors: info.colors,
                track: {
                    title: info.track.basic_info.title,
                    author: info.track.basic_info.author,
                    channel_id: info.track.basic_info.channel_id,
                    thumbnail: info.track.basic_info.thumbnail,
                    duration: info.track.basic_info.duration,
                    id: info.track.basic_info.id
                }
            }];
            this.player.jumpPlayer(1);
            this.player.setState(Date.now());
    
            this.playerControls.play();
        } else {
            handleBrowse(endpoint, navigation);
        }
    }
    
    async handleAction (data: any, item: any, navigation: any) {
        if (data.endpoint.metadata.api_url) {
            if (data.endpoint.metadata.api_url == '/browse') {
                handleBrowse(data.endpoint, navigation);
            }
        } else if (data.type == 'MenuServiceItem') {
            var track: MusicTrackInfo = {
                colors: await ImageColors.getColors(this.getThumbnail(item.thumbnail, 50).url, { }),
                track: {
                    title: item.title,
                    author: item.artists[0].name,
                    channel_id: item.channel_id,
                    thumbnail: [item.thumbnail],
                    duration: item.duration.seconds,
                    id: item.id
                }
            };

            if (!this.player.queue.length) {
                this.resetPlayer();
                this.player.queue = [track];
                this.playerControls.play();
            } else if (data.endpoint.payload.queueInsertPosition == 'INSERT_AFTER_CURRENT_VIDEO') {
                this.player.queue.splice(this.player.currentIndex + 1, 0, track);
            } else {
                this.player.queue.push(track);
            }

            this.player.setState(Date.now());

            if (this.player.shuffled) {
                this.player.unshuffledQueue.push(track);
            }
        }
    }

    getThumbnail (thumbnails: any, width: number): any {
        var initSort = thumbnails[0].width > thumbnails[thumbnails.length - 1].width;
        var index = initSort ? 0 : thumbnails.length - 1;
        var size = initSort ? thumbnails[0].width : thumbnails[thumbnails.length - 1].width;
    
        if (width == -1) {
            for (var i = 0; i < thumbnails.length; i++) {
                if (thumbnails[i].width > size) {
                    size = thumbnails[i].width;
                    index = i;
                }
            }
        } else {
            width = PixelRatio.getPixelSizeForLayoutSize(width);

            for (var i = 0; i < thumbnails.length; i++) {
                if (thumbnails[i].width >= width && thumbnails[i].width < size) {
                    size = thumbnails[i].width;
                    index = i;
                }
            }
        }

        return thumbnails[index];
    }
}

function handleBrowse (endpoint: any, navigation: any): void {
    switch (endpoint.payload.browseEndpointContextSupportedConfigs.browseEndpointContextMusicConfig.pageType) {
        case 'MUSIC_PAGE_TYPE_ARTIST':
        case 'MUSIC_PAGE_TYPE_USER_CHANNEL':
            navigation.push('Artist', { id: endpoint.payload.browseId });
            break;
        case 'MUSIC_PAGE_TYPE_ALBUM':
            navigation.push('Playlist', { id: endpoint.payload.browseId, type: 0 });
            break;
        case 'MUSIC_PAGE_TYPE_PLAYLIST':
            navigation.push('Playlist', { id: endpoint.payload.browseId, type: 1 });
            break;
        case 'MUSIC_PAGE_TYPE_TRACK_CREDITS':
            navigation.push('Credits', { id: endpoint.payload.browseId });
        default:
            Logger.log('Unknown Endpoint: ' + endpoint.payload.browseEndpointContextSupportedConfigs.browseEndpointContextMusicConfig.pageType);
            break;
    }
}

function getRGB (color: number): { r: number; g: number; b: number } {
    return { r: (color & 0xff0000) >> 16, g: (color & 0x00ff00) >> 8, b: color & 0x0000ff };
}

export interface MusicTrackInfo {
    colors: any;
    track: {
        title?: string;
        author?: string;
        channel_id?: string;
        thumbnail?: {
            url: string;
            height: number;
            width: number;
        }[];
        duration?: number;
        id?: string;
    }
}

export default new YoutubeManager();