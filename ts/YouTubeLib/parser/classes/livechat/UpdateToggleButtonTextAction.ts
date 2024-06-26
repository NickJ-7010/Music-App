import Text from '../misc/Text';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
class UpdateToggleButtonTextAction extends YTNode {
  static type = 'UpdateToggleButtonTextAction';

  default_text: string;
  toggled_text: string;
  button_id: string;

  constructor(data: RawNode) {
    super();
    this.default_text = new Text(data.defaultText).toString();
    this.toggled_text = new Text(data.toggledText).toString();
    this.button_id = data.buttonId;
  }
}

export default UpdateToggleButtonTextAction;