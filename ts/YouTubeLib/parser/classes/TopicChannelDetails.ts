import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import SubscribeButton from './SubscribeButton';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class TopicChannelDetails extends YTNode {
  static type = 'TopicChannelDetails';

  title: Text;
  avatar: Thumbnail[];
  subtitle: Text;
  subscribe_button: SubscribeButton | null;
  endpoint: NavigationEndpoint;

  constructor (data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.avatar = Thumbnail.fromResponse(data.thumbnail ?? data.avatar);
    this.subtitle = new Text(data.subtitle);
    this.subscribe_button = Parser.parseItem(data.subscribeButton, SubscribeButton);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
  }
}