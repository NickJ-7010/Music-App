import { YTNode } from '../helpers';
import { type RawNode } from '../index';
import { Text } from '../misc';

export default class Factoid extends YTNode {
  static type = 'Factoid';

  label: Text;
  value: Text;
  accessibility_text: String;

  constructor(data: RawNode) {
    super();
    this.label = new Text(data.label);
    this.value = new Text(data.value);
    this.accessibility_text = data.accessibilityText;
  }
}
