import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class RemoveChatItemByAuthorAction extends YTNode {
  static type = 'RemoveChatItemByAuthorAction';

  external_channel_id: string;

  constructor(data: RawNode) {
    super();
    this.external_channel_id = data.externalChannelId;
  }
}