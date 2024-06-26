import Author from '../../misc/Author';
import { Parser } from '../../../index';
import NavigationEndpoint from '../../NavigationEndpoint';
import Text from '../../misc/Text';

import { YTNode } from '../../../helpers';
import type { RawNode } from '../../../index';

export default class LiveChatTickerPaidMessageItem extends YTNode {
  static type = 'LiveChatTickerPaidMessageItem';

  author: Author;
  amount: Text;
  duration_sec: string;
  full_duration_sec: string;
  show_item: YTNode;
  show_item_endpoint: NavigationEndpoint;
  id: string;

  constructor(data: RawNode) {
    super();
    this.author = new Author(
      data.authorName,
      data.authorBadges,
      data.authorPhoto,
      data.authorExternalChannelId
    );

    this.amount = new Text(data.amount);
    this.duration_sec = data.durationSec;
    this.full_duration_sec = data.fullDurationSec;
    this.show_item = Parser.parseItem(data.showItemEndpoint?.showLiveChatItemEndpoint?.renderer);
    this.show_item_endpoint = new NavigationEndpoint(data.showItemEndpoint);
    this.id = data.id;
  }
}