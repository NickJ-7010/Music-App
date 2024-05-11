import type { ObservedArray } from '../helpers';
import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import SearchFilterGroup from './SearchFilterGroup';
import Text from './misc/Text';

export default class SearchFilterOptionsDialog extends YTNode {
  static type = 'SearchFilterOptionsDialog';

  title: Text;
  groups: ObservedArray<SearchFilterGroup>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.groups = Parser.parseArray(data.groups, SearchFilterGroup);
  }
}