import Text from '../misc/Text';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class UpdateTitleAction extends YTNode {
  static type = 'UpdateTitleAction';

  title: Text;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
  }
}