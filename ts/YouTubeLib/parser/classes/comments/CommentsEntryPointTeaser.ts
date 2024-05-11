import Text from '../misc/Text';
import Thumbnail from '../misc/Thumbnail';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class CommentsEntryPointTeaser extends YTNode {
  static type = 'CommentsEntryPointTeaser';

  teaser_avatar?: Thumbnail[];
  teaser_content?: Text;

  constructor(data: RawNode) {
    super();

    if (Reflect.has(data, 'teaserAvatar')) {
      this.teaser_avatar = Thumbnail.fromResponse(data.teaserAvatar);
    }

    if (Reflect.has(data, 'teaserContent')) {
      this.teaser_content = new Text(data.teaserContent);
    }
  }
}