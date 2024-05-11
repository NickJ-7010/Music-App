import { YTNode } from '../helpers';
import Text from './misc/Text';
import type { RawNode } from '../index';

export default class HashtagHeader extends YTNode {
  static type = 'HashtagHeader';

  hashtag: Text;
  hashtag_info: Text;

  constructor(data: RawNode) {
    super();
    this.hashtag = new Text(data.hashtag);
    this.hashtag_info = new Text(data.hashtagInfoText);
  }
}