import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';
import NavigationEndpoint from './NavigationEndpoint';

export default class Notification extends YTNode {
  static type = 'Notification';

  thumbnails: Thumbnail[];
  video_thumbnails: Thumbnail[];
  short_message: Text;
  sent_time: Text;
  notification_id: string;
  endpoint: NavigationEndpoint;
  record_click_endpoint: NavigationEndpoint;
  menu: YTNode;
  read: boolean;

  constructor(data: RawNode) {
    super();
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
    this.video_thumbnails = Thumbnail.fromResponse(data.videoThumbnail);
    this.short_message = new Text(data.shortMessage);
    this.sent_time = new Text(data.sentTimeText);
    this.notification_id = data.notificationId;
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.record_click_endpoint = new NavigationEndpoint(data.recordClickEndpoint);
    this.menu = Parser.parseItem(data.contextualMenu);
    this.read = data.read;
  }
}