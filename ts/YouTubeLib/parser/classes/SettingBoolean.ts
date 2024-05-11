import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class SettingBoolean extends YTNode {
  static type = 'SettingBoolean';

  title?: Text;
  summary?: Text;
  enable_endpoint?: NavigationEndpoint;
  disable_endpoint?: NavigationEndpoint;
  item_id: string;

  constructor(data: RawNode) {
    super();
    if (Reflect.has(data, 'title')) {
      this.title = new Text(data.title);
    }

    if (Reflect.has(data, 'summary')) {
      this.summary = new Text(data.summary);
    }

    if (Reflect.has(data, 'enableServiceEndpoint')) {
      this.enable_endpoint = new NavigationEndpoint(data.enableServiceEndpoint);
    }

    if (Reflect.has(data, 'disableServiceEndpoint')) {
      this.disable_endpoint = new NavigationEndpoint(data.disableServiceEndpoint);
    }

    this.item_id = data.itemId;
  }
}