import Text from './misc/Text';
import * as Parser from '../parser';
import { type ObservedArray, YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class GuideSection extends YTNode {
  static type = 'GuideSection';

  title?: Text;
  items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    if (Reflect.has(data, 'formattedTitle')) {
      this.title = new Text(data.formattedTitle);
    }

    this.items = Parser.parseArray(data.items);
  }
}