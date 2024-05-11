import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class ThumbnailOverlayEndorsement extends YTNode {
  static type = 'ThumbnailOverlayEndorsement';

  text: string;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.text).toString();
  }
}