import { YTNode } from '../../../helpers';
import type { RawNode } from '../../../index';
import { Parser } from '../../../index';
import Button from '../../Button';
import Text from '../../misc/Text';

export default class LiveChatBannerHeader extends YTNode {
  static type = 'LiveChatBannerHeader';

  text: Text;
  icon_type?: string;
  context_menu_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.text = new Text(data.text);

    if (Reflect.has(data, 'icon') && Reflect.has(data.icon, 'iconType')) {
      this.icon_type = data.icon.iconType;
    }

    this.context_menu_button = Parser.parseItem(data.contextMenuButton, Button);
  }
}