import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import MusicResponsiveListItem from './MusicResponsiveListItem';

export default class MusicPlaylistShelf extends YTNode {
  static type = 'MusicPlaylistShelf';

  playlist_id: string;
  contents: ObservedArray<MusicResponsiveListItem>;
  collapsed_item_count: number;
  continuation: string | null;

  constructor(data: RawNode) {
    super();
    this.playlist_id = data.playlistId;
    this.contents = Parser.parseArray(data.contents, MusicResponsiveListItem);
    this.collapsed_item_count = data.collapsedItemCount;
    this.continuation = data.continuations?.[0]?.nextContinuationData?.continuation || null;
  }
}