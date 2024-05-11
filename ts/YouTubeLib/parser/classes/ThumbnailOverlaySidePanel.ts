import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class ThumbnailOverlaySidePanel extends YTNode {
  static type = 'ThumbnailOverlaySidePanel';

  text: Text;
  icon_type: string;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.text);
    this.icon_type = data.icon.iconType;
  }
}