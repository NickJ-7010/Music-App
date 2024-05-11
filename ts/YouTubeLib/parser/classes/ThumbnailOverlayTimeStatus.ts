import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class ThumbnailOverlayTimeStatus extends YTNode {
  static type = 'ThumbnailOverlayTimeStatus';

  text: string;
  style: string;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.text).toString();
    this.style = data.style;
  }
}