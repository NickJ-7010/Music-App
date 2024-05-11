import { Parser } from '../../index';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class AddLiveChatTickerItemAction extends YTNode {
  static type = 'AddLiveChatTickerItemAction';

  item: YTNode;
  duration_sec: string; // TODO: check this assumption.

  constructor(data: RawNode) {
    super();
    this.item = Parser.parseItem(data.item);
    this.duration_sec = data.durationSec;
  }
}