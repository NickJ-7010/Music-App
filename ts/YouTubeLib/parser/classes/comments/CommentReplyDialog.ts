import { Parser } from '../../index';
import Button from '../Button';
import Text from '../misc/Text';
import Thumbnail from '../misc/Thumbnail';

import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class CommentReplyDialog extends YTNode {
  static type = 'CommentReplyDialog';

  reply_button: Button | null;
  cancel_button: Button | null;
  author_thumbnail: Thumbnail[];
  placeholder: Text;
  error_message: Text;

  constructor(data: RawNode) {
    super();
    this.reply_button = Parser.parseItem(data.replyButton, Button);
    this.cancel_button = Parser.parseItem(data.cancelButton, Button);
    this.author_thumbnail = Thumbnail.fromResponse(data.authorThumbnail);
    this.placeholder = new Text(data.placeholderText);
    this.error_message = new Text(data.errorMessage);
  }
}