import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class CallToActionButton extends YTNode {
  static type = 'CallToActionButton';

  label: Text;
  icon_type: string;
  style: string;

  constructor(data: RawNode) {
    super();
    this.label = new Text(data.label);
    this.icon_type = data.icon.iconType;
    this.style = data.style;
  }
}