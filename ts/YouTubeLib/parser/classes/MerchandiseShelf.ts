import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class MerchandiseShelf extends YTNode {
  static type = 'MerchandiseShelf';

  title: string;
  menu: YTNode;
  items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.title = data.title;
    this.menu = Parser.parseItem(data.actionButton);
    this.items = Parser.parseArray(data.items);
  }

  // XXX: Alias for consistency.
  get contents() {
    return this.items;
  }
}