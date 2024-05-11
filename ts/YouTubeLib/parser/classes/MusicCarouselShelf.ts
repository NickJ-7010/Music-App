import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';

import MusicCarouselShelfBasicHeader from './MusicCarouselShelfBasicHeader';
import MusicMultiRowListItem from './MusicMultiRowListItem';
import MusicNavigationButton from './MusicNavigationButton';
import MusicResponsiveListItem from './MusicResponsiveListItem';
import MusicTwoRowItem from './MusicTwoRowItem';

export default class MusicCarouselShelf extends YTNode {
  static type = 'MusicCarouselShelf';

  header: MusicCarouselShelfBasicHeader | null;
  contents: ObservedArray<MusicTwoRowItem | MusicResponsiveListItem | MusicMultiRowListItem | MusicNavigationButton>;
  num_items_per_column?: number;

  constructor(data: RawNode) {
    super();
    this.header = Parser.parseItem(data.header, MusicCarouselShelfBasicHeader);
    this.contents = Parser.parseArray(data.contents, [ MusicTwoRowItem, MusicResponsiveListItem, MusicMultiRowListItem, MusicNavigationButton ]);

    if (Reflect.has(data, 'numItemsPerColumn')) {
      this.num_items_per_column = parseInt(data.numItemsPerColumn);
    }
  }
}