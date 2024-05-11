import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class AttributionView extends YTNode {
  static type = 'AttributionView';

  text: Text;
  suffix: Text;

  constructor(data: RawNode) {
    super();

    this.text = Text.fromAttributed(data.text);
    this.suffix = Text.fromAttributed(data.suffix);
  }
}