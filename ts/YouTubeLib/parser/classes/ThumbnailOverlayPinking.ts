import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class ThumbnailOverlayPinking extends YTNode {
  static type = 'ThumbnailOverlayPinking';

  hack: boolean;

  constructor(data: RawNode) {
    super();
    this.hack = data.hack;
  }
}