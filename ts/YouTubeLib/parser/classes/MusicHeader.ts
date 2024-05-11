import { Parser, type RawNode } from '../index';
import { YTNode } from '../helpers';
import Text from './misc/Text';

export default class MusicHeader extends YTNode {
  static type = 'MusicHeader';

  header?: YTNode;
  title?: Text;

  constructor(data: RawNode) {
    super();

    if (Reflect.has(data, 'header')) {
      this.header = Parser.parseItem(data.header);
    }

    if (Reflect.has(data, 'title')) {
      this.title = new Text(data.title);
    }
  }
}