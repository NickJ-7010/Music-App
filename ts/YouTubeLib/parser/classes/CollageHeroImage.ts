import NavigationEndpoint from './NavigationEndpoint';
import Thumbnail from './misc/Thumbnail';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class CollageHeroImage extends YTNode {
  static type = 'CollageHeroImage';

  left: Thumbnail[];
  top_right: Thumbnail[];
  bottom_right: Thumbnail[];
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.left = Thumbnail.fromResponse(data.leftThumbnail);
    this.top_right = Thumbnail.fromResponse(data.topRightThumbnail);
    this.bottom_right = Thumbnail.fromResponse(data.bottomRightThumbnail);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
  }
}