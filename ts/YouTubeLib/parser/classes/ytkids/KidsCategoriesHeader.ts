import { Parser } from '../../index';
import Button from '../Button';
import KidsCategoryTab from './KidsCategoryTab';
import { type ObservedArray, YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class KidsCategoriesHeader extends YTNode {
  static type = 'kidsCategoriesHeader';

  category_tabs: ObservedArray<KidsCategoryTab>;
  privacy_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.category_tabs = Parser.parseArray(data.categoryTabs, KidsCategoryTab);
    this.privacy_button = Parser.parseItem(data.privacyButtonRenderer, Button);
  }
}