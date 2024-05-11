import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import Tab from './Tab';

export default class SingleColumnBrowseResults extends YTNode {
  static type = 'SingleColumnBrowseResults';

  tabs: ObservedArray<Tab>;

  constructor(data: RawNode) {
    super();
    this.tabs = Parser.parseArray(data.tabs, Tab);
  }
}