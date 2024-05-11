import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class RichSection extends YTNode {
  static type = 'RichSection';

  content: YTNode;

  constructor(data: RawNode) {
    super();
    this.content = Parser.parseItem(data.content);
  }
}