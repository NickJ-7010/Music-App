import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class ItemSectionTab extends YTNode {
  static type = 'Tab';

  title: Text;
  selected: boolean;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.selected = !!data.selected;
    this.endpoint = new NavigationEndpoint(data.endpoint);
  }
}