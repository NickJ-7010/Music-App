import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class SettingsSwitch extends YTNode {
  static type = 'SettingsSwitch';

  title: Text;
  subtitle: Text;
  enabled: boolean;
  enable_endpoint: NavigationEndpoint;
  disable_endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.subtitle = new Text(data.subtitle);
    this.enabled = data.enabled;
    this.enable_endpoint = new NavigationEndpoint(data.enableServiceEndpoint);
    this.disable_endpoint = new NavigationEndpoint(data.disableServiceEndpoint);
  }
}