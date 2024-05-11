import Text from './misc/Text';
import NavigationEndpoint from './NavigationEndpoint';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class SingleActionEmergencySupport extends YTNode {
  static type = 'SingleActionEmergencySupport';

  action_text: Text;
  nav_text: Text;
  details: Text;
  icon_type: string;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.action_text = new Text(data.actionText);
    this.nav_text = new Text(data.navigationText);
    this.details = new Text(data.detailsText);
    this.icon_type = data.icon.iconType;
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
  }
}