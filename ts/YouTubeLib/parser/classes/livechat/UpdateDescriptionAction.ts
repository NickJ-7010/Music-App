import Text from '../misc/Text';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class UpdateDescriptionAction extends YTNode {
  static type = 'UpdateDescriptionAction';

  description: Text;

  constructor(data: RawNode) {
    super();
    this.description = new Text(data.description);
  }
}