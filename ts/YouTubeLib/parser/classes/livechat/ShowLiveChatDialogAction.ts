import { Parser } from '../../index';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class ShowLiveChatDialogAction extends YTNode {
  static type = 'ShowLiveChatDialogAction';

  dialog: YTNode;

  constructor(data: RawNode) {
    super();
    this.dialog = Parser.parseItem(data.dialog);
  }
}