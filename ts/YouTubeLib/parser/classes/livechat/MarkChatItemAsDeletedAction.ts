import Text from '../misc/Text';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class MarkChatItemAsDeletedAction extends YTNode {
  static type = 'MarkChatItemAsDeletedAction';

  deleted_state_message: Text;
  target_item_id: string;

  constructor(data: RawNode) {
    super();
    this.deleted_state_message = new Text(data.deletedStateMessage);
    this.target_item_id = data.targetItemId;
  }
}