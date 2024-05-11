import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Thumbnail from './misc/Thumbnail';

export default class ImageBannerView extends YTNode {
  static type = 'ImageBannerView';

  image: Thumbnail[];
  style: string;

  constructor(data: RawNode) {
    super();
    this.image = Thumbnail.fromResponse(data.image);
    this.style = data.style;
  }
}