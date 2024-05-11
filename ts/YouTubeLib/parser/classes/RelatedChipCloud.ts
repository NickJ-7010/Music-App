import { Parser, type RawNode } from '../index';
import { YTNode } from '../helpers';

export default class RelatedChipCloud extends YTNode {
  static type = 'RelatedChipCloud';

  content: YTNode;

  constructor(data: RawNode) {
    super();
    this.content = Parser.parseItem(data.content);
  }
}