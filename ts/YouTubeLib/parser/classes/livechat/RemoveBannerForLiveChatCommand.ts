import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class RemoveBannerForLiveChatCommand extends YTNode {
  static type = 'RemoveBannerForLiveChatCommand';

  target_action_id: string;

  constructor(data: RawNode) {
    super();
    this.target_action_id = data.targetActionId;
  }
}