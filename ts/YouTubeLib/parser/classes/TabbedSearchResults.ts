import { Parser, type RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';
import Tab from './Tab';

export default class TabbedSearchResults extends YTNode {
  static type = 'TabbedSearchResults';

  tabs: ObservedArray<Tab>;

  constructor(data: RawNode) {
    super();
    this.tabs = Parser.parseArray(data.tabs, Tab);
  }
}