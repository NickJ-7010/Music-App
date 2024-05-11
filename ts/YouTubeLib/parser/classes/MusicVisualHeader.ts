import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Menu from './menus/Menu';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class MusicVisualHeader extends YTNode {
  static type = 'MusicVisualHeader';

  title: Text;
  thumbnail: Thumbnail[];
  menu: Menu | null;
  foreground_thumbnail: Thumbnail[];

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.thumbnail = data.thumbnail ? Thumbnail.fromResponse(data.thumbnail.musicThumbnailRenderer?.thumbnail) : [];
    this.menu = Parser.parseItem(data.menu, Menu);
    this.foreground_thumbnail = data.foregroundThumbnail ? Thumbnail.fromResponse(data.foregroundThumbnail.musicThumbnailRenderer?.thumbnail) : [];
  }
}