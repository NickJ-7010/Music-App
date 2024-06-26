import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import Text from './misc/Text';

export default class VerticalList extends YTNode {
  static type = 'VerticalList';

  items: ObservedArray<YTNode>;
  collapsed_item_count: string; // Number?
  collapsed_state_button_text: Text;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parseArray(data.items);
    this.collapsed_item_count = data.collapsedItemCount;
    this.collapsed_state_button_text = new Text(data.collapsedStateButtonText);
  }

  // XXX: Alias for consistency.
  get contents() {
    return this.items;
  }
}