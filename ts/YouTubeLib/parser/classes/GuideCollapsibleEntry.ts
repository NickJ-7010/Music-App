import * as Parser from '../parser';
import GuideEntry from './GuideEntry';
import type { RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';

export default class GuideCollapsibleEntry extends YTNode {
  static type = 'GuideCollapsibleEntry';

  expander_item: GuideEntry | null;
  collapser_item: GuideEntry | null;
  expandable_items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.expander_item = Parser.parseItem(data.expanderItem, GuideEntry);
    this.collapser_item = Parser.parseItem(data.collapserItem, GuideEntry);
    this.expandable_items = Parser.parseArray(data.expandableItems);
  }
}