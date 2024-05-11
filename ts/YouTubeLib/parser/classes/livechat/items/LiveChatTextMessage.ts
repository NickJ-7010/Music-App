import { type ObservedArray, YTNode } from '../../../helpers';
import type { RawNode } from '../../../index';
import { Parser } from '../../../index';
import Button from '../../Button';
import NavigationEndpoint from '../../NavigationEndpoint';
import Author from '../../misc/Author';
import Text from '../../misc/Text';

export class LiveChatMessageBase extends YTNode {
  static type = 'LiveChatMessageBase';

  message: Text;
  inline_action_buttons: ObservedArray<Button>;
  timestamp: number;
  id: string;

  constructor(data: RawNode) {
    super();
    this.message = new Text(data.message);
    this.inline_action_buttons = Parser.parseArray(data.inlineActionButtons, Button);
    this.timestamp = Math.floor(parseInt(data.timestampUsec) / 1000);
    this.id = data.id;
  }
}

export default class LiveChatTextMessage extends LiveChatMessageBase {
  static type = 'LiveChatTextMessage';

  author: Author;
  menu_endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super(data);

    this.author = new Author(
      data.authorName,
      data.authorBadges,
      data.authorPhoto,
      data.authorExternalChannelId
    );

    this.menu_endpoint = new NavigationEndpoint(data.contextMenuEndpoint);
  }
}