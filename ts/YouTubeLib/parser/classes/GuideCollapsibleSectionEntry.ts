import * as Parser from '../parser';
import type { RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';

export default class GuideCollapsibleSectionEntry extends YTNode {
  static type = 'GuideCollapsibleSectionEntry';

  header_entry: YTNode;
  expander_icon: string;
  collapser_icon: string;
  section_items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.header_entry = Parser.parseItem(data.headerEntry);
    this.expander_icon = data.expanderIcon.iconType;
    this.collapser_icon = data.collapserIcon.iconType;
    this.section_items = Parser.parseArray(data.sectionItems);
  }
}