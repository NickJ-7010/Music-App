import type { ObservedArray } from '../../helpers';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';
import MenuNavigationItem from './MenuNavigationItem';
import MenuServiceItem from './MenuServiceItem';

export default class MenuPopup extends YTNode {
  static type = 'MenuPopup';

  items: ObservedArray<MenuNavigationItem | MenuServiceItem>;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parseArray(data.items, [ MenuNavigationItem, MenuServiceItem ]);
  }
}