import Thumbnail from './misc/Thumbnail';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class MusicThumbnail extends YTNode {
  static type = 'MusicThumbnail';

  contents: Thumbnail[];

  constructor(data: RawNode) {
    super();
    this.contents = Thumbnail.fromResponse(data.thumbnail);
  }
}