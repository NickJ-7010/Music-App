import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class ReelItem extends YTNode {
  static type = 'ReelItem';

  id: string;
  title: Text;
  thumbnails: Thumbnail[];
  views: Text;
  endpoint: NavigationEndpoint;
  accessibility_label?: string;

  constructor(data: RawNode) {
    super();
    this.id = data.videoId;
    this.title = new Text(data.headline);
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
    this.views = new Text(data.viewCountText);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.accessibility_label = data.accessibility.accessibilityData.label;
  }
}