import Button from './Button';
import Text from './misc/Text';
import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class AlertWithButton extends YTNode {
  static type = 'AlertWithButton';

  text: Text;
  alert_type: string;
  dismiss_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.text);
    this.alert_type = data.type;
    this.dismiss_button = Parser.parseItem(data.dismissButton, Button);
  }
}