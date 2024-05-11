import { YTNode } from '../../helpers';
import Text from '../misc/Text';
import Thumbnail from '../misc/Thumbnail';
import type { RawNode } from '../../index';

export default class CommentsSimplebox extends YTNode {
  static type = 'CommentsSimplebox';

  simplebox_avatar: Thumbnail[];
  simplebox_placeholder: Text;

  constructor(data: RawNode) {
    super();
    this.simplebox_avatar = Thumbnail.fromResponse(data.simpleboxAvatar);
    this.simplebox_placeholder = new Text(data.simpleboxPlaceholder);
  }
}