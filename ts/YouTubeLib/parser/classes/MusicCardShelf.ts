import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import Button from './Button';
import Menu from './menus/Menu';
import Text from './misc/Text';
import MusicCardShelfHeaderBasic from './MusicCardShelfHeaderBasic';
import MusicInlineBadge from './MusicInlineBadge';
import MusicItemThumbnailOverlay from './MusicItemThumbnailOverlay';
import MusicThumbnail from './MusicThumbnail';
import NavigationEndpoint from './NavigationEndpoint';

export default class MusicCardShelf extends YTNode {
  static type = 'MusicCardShelf';

  thumbnail: MusicThumbnail | null;
  title: Text;
  subtitle: Text;
  buttons: ObservedArray<Button>;
  menu: Menu | null;
  on_tap: NavigationEndpoint;
  header: MusicCardShelfHeaderBasic | null;
  end_icon_type?: string;
  subtitle_badges: ObservedArray<MusicInlineBadge>;
  thumbnail_overlay: MusicItemThumbnailOverlay | null;
  contents?: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.thumbnail = Parser.parseItem(data.thumbnail, MusicThumbnail);
    this.title = new Text(data.title);
    this.subtitle = new Text(data.subtitle);
    this.buttons = Parser.parseArray(data.buttons, Button);
    this.menu = Parser.parseItem(data.menu, Menu);
    this.on_tap = new NavigationEndpoint(data.onTap);
    this.header = Parser.parseItem(data.header, MusicCardShelfHeaderBasic);

    if (Reflect.has(data, 'endIcon') && Reflect.has(data.endIcon, 'iconType')) {
      this.end_icon_type = data.endIcon.iconType;
    }

    this.subtitle_badges = Parser.parseArray(data.subtitleBadges, MusicInlineBadge);
    this.thumbnail_overlay = Parser.parseItem(data.thumbnailOverlay, MusicItemThumbnailOverlay);

    if (Reflect.has(data, 'contents')) {
      this.contents = Parser.parseArray(data.contents);
    }
  }
}