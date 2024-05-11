import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class BrowserMediaSession extends YTNode {
  static type = 'BrowserMediaSession';

  album: Text;
  thumbnails: Thumbnail[];

  constructor (data: RawNode) {
    super();
    this.album = new Text(data.album);
    this.thumbnails = Thumbnail.fromResponse(data.thumbnailDetails);
  }
}