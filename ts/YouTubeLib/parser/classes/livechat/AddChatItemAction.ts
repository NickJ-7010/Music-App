import { Parser } from '../../index';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class AddChatItemAction extends YTNode {
  static type = 'AddChatItemAction';

  item: YTNode;
  client_id?: string;

  constructor(data: RawNode) {
    super();
    this.item = Parser.parseItem(data.item);
    if (Reflect.has(data, 'clientId')) {
      this.client_id = data.clientId;
    }
  }
}