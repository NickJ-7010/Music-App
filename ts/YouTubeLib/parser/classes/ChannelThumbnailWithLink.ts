import Thumbnail from './misc/Thumbnail';
import NavigationEndpoint from './NavigationEndpoint';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class ChannelThumbnailWithLink extends YTNode {
  static type = 'ChannelThumbnailWithLink';

  thumbnails: Thumbnail[];
  endpoint: NavigationEndpoint;
  label?: string;

  constructor(data: RawNode) {
    super();
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.label = data.accessibility?.accessibilityData?.label;
  }
}