import { Parser, type RawNode } from '../index';
import Text from './misc/Text';
import Button from './Button';
import { YTNode } from '../helpers';

export default class ConfirmDialog extends YTNode {
  static type = 'ConfirmDialog';

  title: Text;
  confirm_button: Button | null;
  cancel_button: Button | null;
  dialog_messages: Text[];

  constructor (data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.confirm_button = Parser.parseItem(data.confirmButton, Button);
    this.cancel_button = Parser.parseItem(data.cancelButton, Button);
    this.dialog_messages = data.dialogMessages.map((txt: RawNode) => new Text(txt));
  }
}