import { Constants } from '../../utils/index';
import { InnertubeError } from '../../utils/Utils';
import { MediaInfo } from '../../core/mixins/index';

import Tab from '../classes/Tab';
import AutomixPreviewVideo from '../classes/AutomixPreviewVideo';
import Message from '../classes/Message';
import MicroformatData from '../classes/MicroformatData';
import MusicDescriptionShelf from '../classes/MusicDescriptionShelf';
import PlayerOverlay from '../classes/PlayerOverlay';
import PlaylistPanel from '../classes/PlaylistPanel';
import SectionList from '../classes/SectionList';
import WatchNextTabbedResults from '../classes/WatchNextTabbedResults';

import type RichGrid from '../classes/RichGrid';
import type MusicQueue from '../classes/MusicQueue';
import type Endscreen from '../classes/Endscreen';
import type MusicCarouselShelf from '../classes/MusicCarouselShelf';
import type NavigationEndpoint from '../classes/NavigationEndpoint';
import type PlayerLiveStoryboardSpec from '../classes/PlayerLiveStoryboardSpec';
import type PlayerStoryboardSpec from '../classes/PlayerStoryboardSpec';
import type { ObservedArray, YTNode } from '../helpers';
import type { ApiResponse, Actions } from '../../core/index';

class TrackInfo extends MediaInfo {
  basic_info;
  storyboards?: PlayerStoryboardSpec | PlayerLiveStoryboardSpec;
  endscreen?: Endscreen;

  tabs?: ObservedArray<Tab>;
  current_video_endpoint?: NavigationEndpoint;
  player_overlays?: PlayerOverlay;

  constructor(data: [ApiResponse, ApiResponse?], actions: Actions, cpn: string) {
    super(data, actions, cpn);

    const [ info, next ] = this.page;

    if (!info.microformat?.is(MicroformatData))
      throw new InnertubeError('Invalid microformat', info.microformat);

    this.basic_info = {
      ...info.video_details,
      ...{
        description: info.microformat?.description,
        is_unlisted: info.microformat?.is_unlisted,
        is_family_safe: info.microformat?.is_family_safe,
        url_canonical: info.microformat?.url_canonical,
        tags: info.microformat?.tags
      }
    };

    this.storyboards = info.storyboards;
    this.endscreen = info.endscreen;

    if (next) {
      const tabbed_results = next.contents_memo?.getType(WatchNextTabbedResults)?.[0];

      this.tabs = tabbed_results?.tabs.array().as(Tab);
      this.current_video_endpoint = next.current_video_endpoint;

      // TODO: update PlayerOverlay, YTMusic's is a little bit different.
      this.player_overlays = next.player_overlays?.item().as(PlayerOverlay);
    }
  }

  /**
   * Retrieves contents of the given tab.
   */
  async getTab(title_or_page_type: string): Promise<ObservedArray<YTNode> | SectionList | MusicQueue | RichGrid | Message> {
    if (!this.tabs)
      throw new InnertubeError('Could not find any tab');

    const target_tab =
      this.tabs.get({ title: title_or_page_type }) ||
      this.tabs.matchCondition((tab) => tab.endpoint.payload.browseEndpointContextSupportedConfigs?.browseEndpointContextMusicConfig?.pageType === title_or_page_type) ||
      this.tabs?.[0];

    if (!target_tab)
      throw new InnertubeError(`Tab "${title_or_page_type}" not found`, { available_tabs: this.available_tabs });

    if (target_tab.content)
      return target_tab.content;

    const page = await target_tab.endpoint.call(this.actions, { client: 'YTMUSIC', parse: true });

    if (page.contents?.item().type === 'Message')
      return page.contents.item().as(Message);

    if (!page.contents)
      throw new InnertubeError('Page contents was empty', page);

    return page.contents.item().as(SectionList).contents;
  }

  /**
   * Retrieves up next.
   */
  async getUpNext(automix = true): Promise<PlaylistPanel> {
    const music_queue = await this.getTab('Up next') as MusicQueue;

    if (!music_queue || !music_queue.content)
      throw new InnertubeError('Music queue was empty, the video id is probably invalid.', music_queue);

    const playlist_panel = music_queue.content.as(PlaylistPanel);

    if (!playlist_panel.playlist_id && automix) {
      const automix_preview_video = playlist_panel.contents.firstOfType(AutomixPreviewVideo);

      if (!automix_preview_video)
        throw new InnertubeError('Automix item not found');

      const page = await automix_preview_video.playlist_video?.endpoint.call(this.actions, {
        videoId: this.basic_info.id,
        client: 'YTMUSIC',
        parse: true
      });

      if (!page || !page.contents_memo)
        throw new InnertubeError('Could not fetch automix');

      return page.contents_memo.getType(PlaylistPanel)?.[0];
    }

    return playlist_panel;
  }

  /**
   * Retrieves related content.
   */
  async getRelated(): Promise<ObservedArray<MusicCarouselShelf | MusicDescriptionShelf>> {
    const tab = await this.getTab('MUSIC_PAGE_TYPE_TRACK_RELATED') as ObservedArray<MusicDescriptionShelf | MusicDescriptionShelf>;
    return tab;
  }

  /**
   * Retrieves lyrics.
   */
  async getLyrics(): Promise<MusicDescriptionShelf | undefined> {
    const tab = await this.getTab('MUSIC_PAGE_TYPE_TRACK_LYRICS') as ObservedArray<MusicCarouselShelf | MusicDescriptionShelf>;
    return tab.firstOfType(MusicDescriptionShelf);
  }

  /**
   * Adds the song to the watch history.
   */
  async addToWatchHistory(): Promise<Response> {
    return super.addToWatchHistory(Constants.CLIENTS.YTMUSIC.NAME, Constants.CLIENTS.YTMUSIC.VERSION, 'https://music.');
  }

  get available_tabs(): string[] {
    return this.tabs ? this.tabs.map((tab) => tab.title) : [];
  }
}

export default TrackInfo;