import { YTNode } from '../../../helpers';
import type { RawNode } from '../../../index';
import { Parser } from '../../../index';
import Button from '../../Button';
import Text from '../../misc/Text';
import Thumbnail from '../../misc/Thumbnail';

export default class LiveChatBannerPoll extends YTNode {
  static type = 'LiveChatBannerPoll';

  poll_question: Text;
  author_photo: Thumbnail[];

  choices: {
    option_id: string;
    text: string;
  }[];

  collapsed_state_entity_key: string;
  live_chat_poll_state_entity_key: string;
  context_menu_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.poll_question = new Text(data.pollQuestion);
    this.author_photo = Thumbnail.fromResponse(data.authorPhoto);

    this.choices = data.pollChoices.map((choice: RawNode) => ({
      option_id: choice.pollOptionId,
      text: new Text(choice.text).toString() // XXX: This toString should probably not be used here.
    }));

    this.collapsed_state_entity_key = data.collapsedStateEntityKey;
    this.live_chat_poll_state_entity_key = data.liveChatPollStateEntityKey;
    this.context_menu_button = Parser.parseItem(data.contextMenuButton, Button);
  }
}