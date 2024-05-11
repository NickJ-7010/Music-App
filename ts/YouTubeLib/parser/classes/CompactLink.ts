import Text from './misc/Text';
import NavigationEndpoint from './NavigationEndpoint';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class CompactLink extends YTNode {
  static type = 'CompactLink';

  title: string;
  endpoint: NavigationEndpoint;
  style: string;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title).toString();
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.style = data.style;
  }
}