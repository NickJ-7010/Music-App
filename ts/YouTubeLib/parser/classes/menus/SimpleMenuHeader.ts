import type { SuperParsedResult } from '../../helpers';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';
import Text from '../misc/Text';

export default class SimpleMenuHeader extends YTNode {
  static type = 'SimpleMenuHeader';

  title: Text;
  buttons: SuperParsedResult<YTNode>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    // @TODO: Check if this is of type `Button`.
    this.buttons = Parser.parse(data.buttons);
  }
}