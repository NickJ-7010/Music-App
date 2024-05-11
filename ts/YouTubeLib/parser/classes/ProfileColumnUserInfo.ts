import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class ProfileColumnUserInfo extends YTNode {
  static type = 'ProfileColumnUserInfo';

  title: Text;
  thumbnails: Thumbnail[];

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
  }
}