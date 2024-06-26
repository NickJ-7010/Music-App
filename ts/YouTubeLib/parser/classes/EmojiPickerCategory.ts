import Text from './misc/Text';
import { YTNode } from '../helpers';
import { type RawNode } from '../index';

export default class EmojiPickerCategory extends YTNode {
  static type = 'EmojiPickerCategory';

  category_id: string;
  title: Text;
  emoji_ids: string[];
  image_loading_lazy: boolean;
  category_type: string;

  constructor(data: RawNode) {
    super();
    this.category_id = data.categoryId;
    this.title = new Text(data.title);
    this.emoji_ids = data.emojiIds;
    this.image_loading_lazy = !!data.imageLoadingLazy;
    this.category_type = data.categoryType;
  }
}