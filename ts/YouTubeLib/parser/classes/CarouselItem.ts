import { Parser, type RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';
import Thumbnail from './misc/Thumbnail';

export default class CarouselItem extends YTNode {
  static type = 'CarouselItem';

  items: ObservedArray<YTNode>;
  background_color: string;
  layout_style: string;
  pagination_thumbnails: Thumbnail[];
  paginator_alignment: string;

  constructor (data: RawNode) {
    super();
    this.items = Parser.parseArray(data.carouselItems);
    this.background_color = data.backgroundColor;
    this.layout_style = data.layoutStyle;
    this.pagination_thumbnails = Thumbnail.fromResponse(data.paginationThumbnails);
    this.paginator_alignment = data.paginatorAlignment;
  }

  // XXX: For consistency.
  get contents() {
    return this.items;
  }
}