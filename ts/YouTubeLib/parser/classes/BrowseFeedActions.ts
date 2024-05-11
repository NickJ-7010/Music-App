import { Parser, type RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';

export default class BrowseFeedActions extends YTNode {
  static type = 'BrowseFeedActions';

  contents: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parseArray(data.contents);
  }
}