import { Parser } from '../index';
import AccountChannel from './AccountChannel';
import AccountItemSection from './AccountItemSection';

import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class AccountSectionList extends YTNode {
  static type = 'AccountSectionList';

  contents;
  footers;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parseItem(data.contents[0], AccountItemSection);
    this.footers = Parser.parseItem(data.footers[0], AccountChannel);
  }
}