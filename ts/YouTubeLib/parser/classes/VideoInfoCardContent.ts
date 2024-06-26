import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class VideoInfoCardContent extends YTNode {
  static type = 'VideoInfoCardContent';

  title: Text;
  channel_name: Text;
  view_count: Text;
  video_thumbnails: Thumbnail[];
  duration: Text;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.videoTitle);
    this.channel_name = new Text(data.channelName);
    this.view_count = new Text(data.viewCountText);
    this.video_thumbnails = Thumbnail.fromResponse(data.videoThumbnail);
    this.duration = new Text(data.lengthString);
    this.endpoint = new NavigationEndpoint(data.action);
  }
}