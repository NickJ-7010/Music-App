import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class PlaylistSidebarPrimaryInfo extends YTNode {
  static type = 'PlaylistSidebarPrimaryInfo';

  stats: Text[];
  thumbnail_renderer: YTNode;
  title: Text;
  menu: YTNode;
  endpoint: NavigationEndpoint;
  description: Text;

  constructor(data: RawNode) {
    super();
    this.stats = data.stats.map((stat: RawNode) => new Text(stat));
    this.thumbnail_renderer = Parser.parseItem(data.thumbnailRenderer);
    this.title = new Text(data.title);
    this.menu = Parser.parseItem(data.menu);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.description = new Text(data.description);
  }
}