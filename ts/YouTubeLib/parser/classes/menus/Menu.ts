import { Parser } from '../../index';
import type { ObservedArray } from '../../helpers';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class Menu extends YTNode {
  static type = 'Menu';

  items: ObservedArray<YTNode>;
  top_level_buttons: ObservedArray<YTNode>;
  label?: string;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parseArray(data.items);
    this.top_level_buttons = Parser.parseArray(data.topLevelButtons);

    if (Reflect.has(data, 'accessibility') && Reflect.has(data.accessibility, 'accessibilityData')) {
      this.label = data.accessibility.accessibilityData.label;
    }
  }

  // XXX: alias for consistency
  get contents() {
    return this.items;
  }
}