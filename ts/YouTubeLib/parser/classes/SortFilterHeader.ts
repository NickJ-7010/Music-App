import { YTNode } from '../helpers';
import { Parser, YTNodes, type RawNode } from '../index';

export default class SortFilterHeader extends YTNode {
  static type = 'SortFilterHeader';

  filter_menu: YTNodes.SortFilterSubMenu | null;

  constructor(data: RawNode) {
    super();
    this.filter_menu = Parser.parseItem(data.filterMenu, YTNodes.SortFilterSubMenu);
  }
}