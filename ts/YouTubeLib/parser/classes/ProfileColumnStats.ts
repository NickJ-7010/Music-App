import { Parser, type RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';

export default class ProfileColumnStats extends YTNode {
  static type = 'ProfileColumnStats';

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