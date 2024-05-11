import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class ThumbnailOverlayBottomPanel extends YTNode {
  static type = 'ThumbnailOverlayBottomPanel';

  text?: Text;
  icon_type?: string;

  constructor(data: RawNode) {
    super();
    if (Reflect.has(data, 'text')) {
      this.text = new Text(data.text);
    }

    if (Reflect.has(data, 'icon') && Reflect.has(data.icon, 'iconType')) {
      this.icon_type = data.icon.iconType;
    }
  }
}