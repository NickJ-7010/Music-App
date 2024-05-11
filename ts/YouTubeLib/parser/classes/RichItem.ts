import { Parser, type RawNode } from '../index';
import { YTNode } from '../helpers';

export default class RichItem extends YTNode {
  static type = 'RichItem';

  content: YTNode;

  constructor(data: RawNode) {
    super();
    this.content = Parser.parseItem(data.content);
  }
}