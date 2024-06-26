import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import { Text } from '../misc';

import Menu from './menus/Menu';
import MusicItemThumbnailOverlay from './MusicItemThumbnailOverlay';
import MusicThumbnail from './MusicThumbnail';
import NavigationEndpoint from './NavigationEndpoint';

export default class MusicMultiRowListItem extends YTNode {
  static type = 'MusicMultiRowListItem';

  thumbnail: MusicThumbnail | null;
  overlay: MusicItemThumbnailOverlay | null;
  on_tap: NavigationEndpoint;
  menu: Menu | null;
  subtitle: Text;
  title: Text;
  second_title?: Text;
  description?: Text;
  display_style?: string;

  constructor(data: RawNode) {
    super();
    this.thumbnail = Parser.parseItem(data.thumbnail, MusicThumbnail);
    this.overlay = Parser.parseItem(data.overlay, MusicItemThumbnailOverlay);
    this.on_tap = new NavigationEndpoint(data.onTap);
    this.menu = Parser.parseItem(data.menu, Menu);
    this.subtitle = new Text(data.subtitle);
    this.title = new Text(data.title);

    if (Reflect.has(data, 'secondTitle')) {
      this.second_title = new Text(data.secondTitle);
    }

    if (Reflect.has(data, 'description')) {
      this.description = new Text(data.description);
    }

    if (Reflect.has(data, 'displayStyle')) {
      this.display_style = data.displayStyle;
    }
  }
}