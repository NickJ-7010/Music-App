import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class EmojiPickerCategoryButton extends YTNode {
  static type = 'EmojiPickerCategoryButton';

  category_id: string;
  icon_type?: string;
  tooltip: string;

  constructor(data: RawNode) {
    super();
    this.category_id = data.categoryId;

    if (Reflect.has(data, 'icon')) {
      this.icon_type = data.icon?.iconType;
    }

    this.tooltip = data.tooltip;
  }
}