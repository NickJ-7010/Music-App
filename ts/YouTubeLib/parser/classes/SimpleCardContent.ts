import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class SimpleCardContent extends YTNode {
  static type = 'SimpleCardContent';

  image: Thumbnail[];
  title: Text;
  display_domain: Text;
  show_link_icon: boolean;
  call_to_action: Text;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.image = Thumbnail.fromResponse(data.image);
    this.title = new Text(data.title);
    this.display_domain = new Text(data.displayDomain);
    this.show_link_icon = data.showLinkIcon;
    this.call_to_action = new Text(data.callToAction);
    this.endpoint = new NavigationEndpoint(data.command);
  }
}