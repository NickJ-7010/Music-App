import { Parser, type RawNode } from '../index';
import { YTNode } from '../helpers';

export default class MusicEditablePlaylistDetailHeader extends YTNode {
  static type = 'MusicEditablePlaylistDetailHeader';

  header: YTNode;

  constructor(data: RawNode) {
    super();
    this.header = Parser.parseItem(data.header);

    // TODO: Parse data.editHeader.musicPlaylistEditHeaderRenderer.
  }
}