import { YTNode, type ObservedArray } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Text from './misc/Text';
import SearchFilter from './SearchFilter';

export default class SearchFilterGroup extends YTNode {
  static type = 'SearchFilterGroup';

  title: Text;
  filters: ObservedArray<SearchFilter>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.filters = Parser.parseArray(data.filters, SearchFilter);
  }
}