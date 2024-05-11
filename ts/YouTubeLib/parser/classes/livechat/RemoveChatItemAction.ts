import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class RemoveChatItemAction extends YTNode {
  static type = 'RemoveChatItemAction';

  target_item_id: string;

  constructor(data: RawNode) {
    super();
    this.target_item_id = data.targetItemId;
  }
}