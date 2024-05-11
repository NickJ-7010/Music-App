import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import SubscribeButton from './SubscribeButton';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class SlimOwner extends YTNode {
  static type = 'SlimOwner';

  thumbnail: Thumbnail[];
  title: Text;
  endpoint: NavigationEndpoint;
  subscribe_button: SubscribeButton | null;

  constructor(data: RawNode) {
    super();
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
    this.title = new Text(data.title);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.subscribe_button = Parser.parseItem(data.subscribeButton, SubscribeButton);
  }
}