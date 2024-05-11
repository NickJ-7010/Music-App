import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class SubFeedOption extends YTNode {
  static type = 'SubFeedOption';

  name: Text;
  is_selected: boolean;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.name = new Text(data.name);
    this.is_selected = data.isSelected;
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
  }
}