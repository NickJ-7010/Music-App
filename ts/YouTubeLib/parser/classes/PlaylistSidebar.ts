import { Parser, type RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';

export default class PlaylistSidebar extends YTNode {
  static type = 'PlaylistSidebar';

  items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parseArray(data.items);
  }

  // XXX: alias for consistency
  get contents() {
    return this.items;
  }
}