import { Parser } from '../../index';
import { type SuperParsedResult, YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class MultiPageMenuNotificationSection extends YTNode {
  static type = 'MultiPageMenuNotificationSection';

  items: SuperParsedResult<YTNode>;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parse(data.items);
  }

  // XXX: Alias for consistency.
  get contents() {
    return this.items;
  }
}