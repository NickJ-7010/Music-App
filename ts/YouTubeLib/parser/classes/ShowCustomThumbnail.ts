import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Thumbnail from './misc/Thumbnail';

export default class ShowCustomThumbnail extends YTNode {
  static type = 'ShowCustomThumbnail';

  thumbnail: Thumbnail[];

  constructor(data: RawNode) {
    super();
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
  }
}