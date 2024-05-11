import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class Alert extends YTNode {
  static type = 'Alert';

  text: Text;
  alert_type: string;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.text);
    this.alert_type = data.type;
  }
}