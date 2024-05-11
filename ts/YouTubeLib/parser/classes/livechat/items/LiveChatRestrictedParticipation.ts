import { YTNode } from '../../../helpers';
import Text from '../../misc/Text';
import type { RawNode } from '../../../index';

export default class LiveChatRestrictedParticipation extends YTNode {
  static type = 'LiveChatRestrictedParticipation';

  message: Text;
  icon_type?: string;

  constructor(data: RawNode) {
    super();
    this.message = new Text(data.message);
    if (Reflect.has(data, 'icon') && Reflect.has(data.icon, 'iconType')) {
      this.icon_type = data.icon.iconType;
    }
    // TODO: parse onClickCommand
  }
}