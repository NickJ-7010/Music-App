import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class DimChatItemAction extends YTNode {
  static type = 'DimChatItemAction';

  client_assigned_id: string;

  constructor(data: RawNode) {
    super();
    this.client_assigned_id = data.clientAssignedId;
  }
}