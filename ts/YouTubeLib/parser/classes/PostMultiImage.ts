import { Parser, type RawNode } from '../index';
import BackstageImage from './BackstageImage';
import { YTNode } from '../helpers';

export default class PostMultiImage extends YTNode {
  static type = 'PostMultiImage';

  images : BackstageImage[];

  constructor(data: RawNode) {
    super();
    this.images = Parser.parseArray(data.images, BackstageImage);
  }
}