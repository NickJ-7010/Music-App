import Text from '../misc/Text';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class StatRow extends YTNode {
  static type = 'StatRow';

  title: Text;
  contents: Text;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.contents = new Text(data.contents);
  }
}