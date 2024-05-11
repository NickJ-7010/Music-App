import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import MetadataBadge from './MetadataBadge';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class GridMovie extends YTNode {
  static type = 'GridMovie';

  id: string;
  title: Text;
  thumbnails: Thumbnail[];
  duration: Text | null;
  endpoint: NavigationEndpoint;
  badges: ObservedArray<MetadataBadge>;
  metadata: Text;
  thumbnail_overlays: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    const length_alt = data.thumbnailOverlays.find((overlay: RawNode) => overlay.hasOwnProperty('thumbnailOverlayTimeStatusRenderer'))?.thumbnailOverlayTimeStatusRenderer;
    this.id = data.videoId;
    this.title = new Text(data.title);
    this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
    this.duration = data.lengthText ? new Text(data.lengthText) : length_alt?.text ? new Text(length_alt.text) : null;
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.badges = Parser.parseArray(data.badges, MetadataBadge);
    this.metadata = new Text(data.metadata);
    this.thumbnail_overlays = Parser.parseArray(data.thumbnailOverlays);
  }
}