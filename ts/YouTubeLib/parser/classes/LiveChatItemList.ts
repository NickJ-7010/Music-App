import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Button from './Button';

export default class LiveChatItemList extends YTNode {
  static type = 'LiveChatItemList';

  max_items_to_display: string;
  more_comments_below_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.max_items_to_display = data.maxItemsToDisplay;
    this.more_comments_below_button = Parser.parseItem(data.moreCommentsBelowButton, Button);
  }
}