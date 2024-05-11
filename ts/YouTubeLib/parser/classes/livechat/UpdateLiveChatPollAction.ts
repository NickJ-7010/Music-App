import { Parser } from '../../index';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class UpdateLiveChatPollAction extends YTNode {
  static type = 'UpdateLiveChatPollAction';

  poll_to_update: YTNode;

  constructor(data: RawNode) {
    super();
    this.poll_to_update = Parser.parseItem(data.pollToUpdate);
  }
}