import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Author from './misc/Author';
import Text from './misc/Text';
import NavigationEndpoint from './NavigationEndpoint';

export default class GridChannel extends YTNode {
  static type = 'GridChannel';

  id: string;
  author: Author;
  subscribers: Text;
  video_count: Text;
  endpoint: NavigationEndpoint;
  subscribe_button: YTNode;

  constructor(data: RawNode) {
    super();
    this.id = data.channelId;

    this.author = new Author({
      ...data.title,
      navigationEndpoint: data.navigationEndpoint
    }, data.ownerBadges, data.thumbnail);

    this.subscribers = new Text(data.subscriberCountText);
    this.video_count = new Text(data.videoCountText);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.subscribe_button = Parser.parseItem(data.subscribeButton);
  }
}