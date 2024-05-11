import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class SimpleCardTeaser extends YTNode {
  static type = 'SimpleCardTeaser';

  message: Text;
  prominent: boolean; // @TODO: or string?

  constructor(data: RawNode) {
    super();
    this.message = new Text(data.message);
    this.prominent = data.prominent;
  }
}