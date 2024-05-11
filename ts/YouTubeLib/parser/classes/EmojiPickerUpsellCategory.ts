import Text from './misc/Text';
import NavigationEndpoint from './NavigationEndpoint';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class EmojiPickerUpsellCategory extends YTNode {
  static type = 'EmojiPickerUpsellCategory';

  category_id: string;
  title: Text;
  upsell: Text;
  emoji_tooltip: string;
  endpoint: NavigationEndpoint;
  emoji_ids: string[];

  constructor(data: RawNode) {
    super();
    this.category_id = data.categoryId;
    this.title = new Text(data.title);
    this.upsell = new Text(data.upsell);
    this.emoji_tooltip = data.emojiTooltip;
    this.endpoint = new NavigationEndpoint(data.command);
    this.emoji_ids = data.emojiIds;
  }
}