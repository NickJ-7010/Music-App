import { Parser, ReloadContinuationItemsCommand } from '../../parser/index';
import { concatMemos, InnertubeError } from '../../utils/Utils';

import BackstagePost from '../../parser/classes/BackstagePost';
import SharedPost from '../../parser/classes/SharedPost';
import Channel from '../../parser/classes/Channel';
import CompactVideo from '../../parser/classes/CompactVideo';
import GridChannel from '../../parser/classes/GridChannel';
import GridPlaylist from '../../parser/classes/GridPlaylist';
import GridVideo from '../../parser/classes/GridVideo';
import LockupView from '../../parser/classes/LockupView';
import Playlist from '../../parser/classes/Playlist';
import PlaylistPanelVideo from '../../parser/classes/PlaylistPanelVideo';
import PlaylistVideo from '../../parser/classes/PlaylistVideo';
import Post from '../../parser/classes/Post';
import ReelItem from '../../parser/classes/ReelItem';
import ReelShelf from '../../parser/classes/ReelShelf';
import RichShelf from '../../parser/classes/RichShelf';
import Shelf from '../../parser/classes/Shelf';
import Tab from '../../parser/classes/Tab';
import Video from '../../parser/classes/Video';

import AppendContinuationItemsAction from '../../parser/classes/actions/AppendContinuationItemsAction';
import ContinuationItem from '../../parser/classes/ContinuationItem';
import TwoColumnBrowseResults from '../../parser/classes/TwoColumnBrowseResults';
import TwoColumnSearchResults from '../../parser/classes/TwoColumnSearchResults';
import WatchCardCompactVideo from '../../parser/classes/WatchCardCompactVideo';

import type { ApiResponse, Actions } from '../index';
import type {
  Memo, ObservedArray,
  SuperParsedResult, YTNode
} from '../../parser/helpers';
import type MusicQueue from '../../parser/classes/MusicQueue';
import type RichGrid from '../../parser/classes/RichGrid';
import type SectionList from '../../parser/classes/SectionList';
import type { IParsedResponse } from '../../parser/types/index';

export default class Feed<T extends IParsedResponse = IParsedResponse> {
  #page: T;
  #continuation?: ObservedArray<ContinuationItem>;
  #actions: Actions;
  #memo: Memo;

  constructor(actions: Actions, response: ApiResponse | IParsedResponse, already_parsed = false) {
    if (this.#isParsed(response) || already_parsed) {
      this.#page = response as T;
    } else {
      this.#page = Parser.parseResponse<T>(response.data);
    }

    const memo = concatMemos(...[
      this.#page.contents_memo,
      this.#page.continuation_contents_memo,
      this.#page.on_response_received_commands_memo,
      this.#page.on_response_received_endpoints_memo,
      this.#page.on_response_received_actions_memo,
      this.#page.sidebar_memo,
      this.#page.header_memo
    ]);

    if (!memo)
      throw new InnertubeError('No memo found in feed');

    this.#memo = memo;
    this.#actions = actions;
  }

  #isParsed(response: IParsedResponse | ApiResponse): response is IParsedResponse {
    return !('data' in response);
  }

  /**
   * Get all videos on a given page via memo
   */
  static getVideosFromMemo(memo: Memo) {
    return memo.getType(
      Video,
      GridVideo,
      ReelItem,
      CompactVideo,
      PlaylistVideo,
      PlaylistPanelVideo,
      WatchCardCompactVideo
    );
  }

  /**
   * Get all playlists on a given page via memo
   */
  static getPlaylistsFromMemo(memo: Memo) {
    const playlists: ObservedArray<Playlist | GridPlaylist | LockupView> = memo.getType(Playlist, GridPlaylist);

    const lockup_views = memo.getType(LockupView)
      .filter((lockup) => {
        return [ 'PLAYLIST', 'ALBUM', 'PODCAST' ].includes(lockup.content_type);
      });

    if (lockup_views.length > 0) {
      playlists.push(...lockup_views);
    }

    return playlists;
  }

  /**
   * Get all the videos in the feed
   */
  get videos() {
    return Feed.getVideosFromMemo(this.#memo);
  }

  /**
   * Get all the community posts in the feed
   */
  get posts() {
    return this.#memo.getType(BackstagePost, Post, SharedPost);
  }

  /**
   * Get all the channels in the feed
   */
  get channels() {
    return this.#memo.getType(Channel, GridChannel);
  }

  /**
   * Get all playlists in the feed
   */
  get playlists() {
    return Feed.getPlaylistsFromMemo(this.#memo);
  }

  get memo() {
    return this.#memo;
  }

  /**
   * Returns contents from the page.
   */
  get page_contents(): SectionList | MusicQueue | RichGrid | ReloadContinuationItemsCommand {
    const tab_content = this.#memo.getType(Tab)?.first().content;
    const reload_continuation_items = this.#memo.getType(ReloadContinuationItemsCommand).first();
    const append_continuation_items = this.#memo.getType(AppendContinuationItemsAction).first();

    return tab_content || reload_continuation_items || append_continuation_items;
  }

  /**
   * Returns all segments/sections from the page.
   */
  get shelves() {
    return this.#memo.getType(Shelf, RichShelf, ReelShelf);
  }

  /**
   * Finds shelf by title.
   */
  getShelf(title: string) {
    return this.shelves.get({ title });
  }

  /**
   * Returns secondary contents from the page.
   */
  get secondary_contents(): SuperParsedResult<YTNode> | undefined {
    if (!this.#page.contents?.is_node)
      return undefined;

    const node = this.#page.contents?.item();

    if (!node.is(TwoColumnBrowseResults, TwoColumnSearchResults))
      return undefined;

    return node.secondary_contents;
  }

  get actions(): Actions {
    return this.#actions;
  }

  /**
   * Get the original page data
   */
  get page(): T {
    return this.#page;
  }

  /**
   * Checks if the feed has continuation.
   */
  get has_continuation(): boolean {
    return this.#getBodyContinuations().length > 0;
  }

  /**
   * Retrieves continuation data as it is.
   */
  async getContinuationData(): Promise<T | undefined> {
    if (this.#continuation) {
      if (this.#continuation.length === 0)
        throw new InnertubeError('There are no continuations.');

      const response = await this.#continuation[0].endpoint.call<T>(this.#actions, { parse: true });

      return response;
    }

    this.#continuation = this.#getBodyContinuations();

    if (this.#continuation)
      return this.getContinuationData();
  }

  /**
   * Retrieves next batch of contents and returns a new {@link Feed} object.
   */
  async getContinuation(): Promise<Feed<T>> {
    const continuation_data = await this.getContinuationData();
    if (!continuation_data)
      throw new InnertubeError('Could not get continuation data');
    return new Feed<T>(this.actions, continuation_data, true);
  }

  #getBodyContinuations(): ObservedArray<ContinuationItem> {
    if (this.#page.header_memo) {
      const header_continuations = this.#page.header_memo.getType(ContinuationItem);
      return this.#memo.getType(ContinuationItem).filter(
        (continuation) => !header_continuations.includes(continuation)
      ) as ObservedArray<ContinuationItem>;
    }
    return this.#memo.getType(ContinuationItem);
  }
}