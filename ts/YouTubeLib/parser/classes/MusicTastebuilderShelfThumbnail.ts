import { YTNode } from '../helpers';
import { Thumbnail } from '../misc';
import type { RawNode } from '../index';

export default class MusicTastebuilderShelfThumbnail extends YTNode {
  static type = 'MusicTastebuilderShelfThumbnail';

  thumbnail: Thumbnail[];

  constructor(data: RawNode) {
    super();
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
  }
}