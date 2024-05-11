import { Parser } from '../index';
import Button from './Button';
import Text from './misc/Text';
import MusicTastebuilderShelfThumbnail from './MusicTastebuilderShelfThumbnail';

import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class MusicTasteBuilderShelf extends YTNode {
  static type = 'MusicTasteBuilderShelf';

  thumbnail: MusicTastebuilderShelfThumbnail | null;
  primary_text: Text;
  secondary_text: Text;
  action_button: Button | null;
  is_visible: boolean;

  constructor(data: RawNode) {
    super();
    this.thumbnail = Parser.parseItem(data.thumbnail, MusicTastebuilderShelfThumbnail);
    this.primary_text = new Text(data.primaryText);
    this.secondary_text = new Text(data.secondaryText);
    this.action_button = Parser.parseItem(data.actionButton, Button);
    this.is_visible = data.isVisible;
  }
}