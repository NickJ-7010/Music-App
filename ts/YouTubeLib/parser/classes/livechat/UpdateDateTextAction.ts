import Text from '../misc/Text';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class UpdateDateTextAction extends YTNode {
  static type = 'UpdateDateTextAction';

  date_text: string;

  constructor(data: RawNode) {
    super();
    this.date_text = new Text(data.dateText).toString();
  }
}