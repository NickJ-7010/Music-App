import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import ItemSectionHeader from './ItemSectionHeader';
import ItemSectionTabbedHeader from './ItemSectionTabbedHeader';
import CommentsHeader from './comments/CommentsHeader';
import SortFilterHeader from './SortFilterHeader';

export default class ItemSection extends YTNode {
  static type = 'ItemSection';

  header: CommentsHeader | ItemSectionHeader | ItemSectionTabbedHeader | SortFilterHeader | null;
  contents: ObservedArray<YTNode>;
  target_id?: string;
  continuation?: string;

  constructor(data: RawNode) {
    super();
    this.header = Parser.parseItem(data.header, [ CommentsHeader, ItemSectionHeader, ItemSectionTabbedHeader, SortFilterHeader ]);
    this.contents = Parser.parseArray(data.contents);

    if (data.targetId || data.sectionIdentifier) {
      this.target_id = data.targetId || data.sectionIdentifier;
    }

    if (data.continuations) {
      this.continuation = data.continuations?.at(0)?.nextContinuationData?.continuation;
    }
  }
}