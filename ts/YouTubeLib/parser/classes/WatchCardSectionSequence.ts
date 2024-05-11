import type { ObservedArray } from '../helpers';
import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class WatchCardSectionSequence extends YTNode {
  static type = 'WatchCardSectionSequence';

  lists: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.lists = Parser.parseArray(data.lists);
  }
}