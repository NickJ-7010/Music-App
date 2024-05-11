import { Log } from '../../utils/index';
import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Button from './Button';
import NavigationEndpoint from './NavigationEndpoint';
import SubscribeButton from './SubscribeButton';
import Author from './misc/Author';
import Text from './misc/Text';

export default class Channel extends YTNode {
  static type = 'Channel';

  id: string;
  author: Author;
  subscriber_count: Text;
  video_count: Text;
  long_byline: Text;
  short_byline: Text;
  endpoint: NavigationEndpoint;
  subscribe_button: SubscribeButton | Button | null;
  description_snippet: Text;

  constructor(data: RawNode) {
    super();
    this.id = data.channelId;

    this.author = new Author({
      ...data.title,
      navigationEndpoint: data.navigationEndpoint
    }, data.ownerBadges, data.thumbnail);

    // XXX: `subscriberCountText` is now the channel's handle and `videoCountText` is the subscriber count.
    this.subscriber_count = new Text(data.subscriberCountText);
    this.video_count = new Text(data.videoCountText);
    this.long_byline = new Text(data.longBylineText);
    this.short_byline = new Text(data.shortBylineText);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.subscribe_button = Parser.parseItem(data.subscribeButton, [ SubscribeButton, Button ]);
    this.description_snippet = new Text(data.descriptionSnippet);
  }

  /**
   * @deprecated
   * This will be removed in a future release.
   * Please use {@link Channel.subscriber_count} instead.
   */
  get subscribers(): Text {
    Log.warnOnce(Channel.type, 'Channel#subscribers is deprecated. Please use Channel#subscriber_count instead.');
    return this.subscriber_count;
  }

  /**
   * @deprecated
   * This will be removed in a future release.
   * Please use {@link Channel.video_count} instead.
   */
  get videos(): Text {
    Log.warnOnce(Channel.type, 'Channel#videos is deprecated. Please use Channel#video_count instead.');
    return this.video_count;
  }
}