import { Parser } from '../../index';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class OpenPopupAction extends YTNode {
  static type = 'OpenPopupAction';

  popup: YTNode;
  popup_type: string;

  constructor(data: RawNode) {
    super();
    this.popup = Parser.parseItem(data.popup);
    this.popup_type = data.popupType;
  }
}