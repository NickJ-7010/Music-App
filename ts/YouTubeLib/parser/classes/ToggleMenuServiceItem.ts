import Text from './misc/Text';
import NavigationEndpoint from './NavigationEndpoint';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class ToggleMenuServiceItem extends YTNode {
  static type = 'ToggleMenuServiceItem';

  text: Text;
  toggled_text: Text;
  icon_type: string;
  toggled_icon_type: string;
  default_endpoint: NavigationEndpoint;
  toggled_endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.defaultText);
    this.toggled_text = new Text(data.toggledText);
    this.icon_type = data.defaultIcon.iconType;
    this.toggled_icon_type = data.toggledIcon.iconType;
    this.default_endpoint = new NavigationEndpoint(data.defaultServiceEndpoint);
    this.toggled_endpoint = new NavigationEndpoint(data.toggledServiceEndpoint);
  }
}