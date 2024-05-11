import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Thumbnail from './misc/Thumbnail';

export default class ContentPreviewImageView extends YTNode {
  static type = 'ContentPreviewImageView';

  image: Thumbnail[];
  style: string;

  constructor(data: RawNode) {
    super();
    this.image = Thumbnail.fromResponse(data.image);
    this.style = data.style;
  }
}