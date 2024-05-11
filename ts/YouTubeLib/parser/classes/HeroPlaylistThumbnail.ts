import { YTNode } from '../helpers';
import { type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Thumbnail from './misc/Thumbnail';

export default class HeroPlaylistThumbnail extends YTNode {
  static type = 'HeroPlaylistThumbnail';

  thumbnails: Thumbnail[];
  on_tap_endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
    this.on_tap_endpoint = new NavigationEndpoint(data.onTap);
  }
}