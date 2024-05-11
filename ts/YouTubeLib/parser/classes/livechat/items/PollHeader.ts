import { YTNode } from '../../../helpers';
import type { RawNode } from '../../../index';
import { Parser } from '../../../index';
import Button from '../../Button';
import Text from '../../misc/Text';
import Thumbnail from '../../misc/Thumbnail';

export default class PollHeader extends YTNode {
  static type = 'PollHeader';

  poll_question: Text;
  thumbnails: Thumbnail[];
  metadata: Text;
  live_chat_poll_type: string;
  context_menu_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.poll_question = new Text(data.pollQuestion);
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
    this.metadata = new Text(data.metadataText);
    this.live_chat_poll_type = data.liveChatPollType;
    this.context_menu_button = Parser.parseItem(data.contextMenuButton, Button);
  }
}