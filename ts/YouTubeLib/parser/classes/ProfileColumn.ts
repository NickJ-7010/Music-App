import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class ProfileColumn extends YTNode {
  static type = 'ProfileColumn';

  items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parseArray(data.items);
  }

  // XXX: Alias for consistency.
  get contents() {
    return this.items;
  }
}