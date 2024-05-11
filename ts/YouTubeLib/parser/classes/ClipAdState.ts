import { YTNode } from '../helpers';
import Text from './misc/Text';

import type { RawNode } from '../types/index';

export default class ClipAdState extends YTNode {
  static type = 'ClipAdState';

  title: Text;
  body: Text;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.body = new Text(data.body);
  }
}