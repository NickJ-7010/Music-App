import type { ObservedArray } from '../helpers';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';

export default class ProductList extends YTNode {
  static type = 'ProductList';

  contents: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parseArray(data.contents);
  }
}