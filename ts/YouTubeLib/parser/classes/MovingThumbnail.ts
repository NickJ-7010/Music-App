import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Thumbnail from './misc/Thumbnail';

export default class MovingThumbnail extends YTNode {
  static type = 'MovingThumbnail';

  constructor(data: RawNode) {
    super();
    return data.movingThumbnailDetails?.thumbnails.map((thumbnail: RawNode) => new Thumbnail(thumbnail)).sort((a: any, b: any) => b.width - a.width);
  }
}