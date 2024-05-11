import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class TextHeader extends YTNode {
  static type = 'TextHeader';

  title: Text;
  style: string;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.style = data.style;
  }
}