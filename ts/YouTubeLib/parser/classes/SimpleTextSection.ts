import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class SimpleTextSection extends YTNode {
  static type = 'SimpleTextSection';

  lines: Text[];
  style: string;

  constructor(data: RawNode) {
    super();
    this.lines = data.lines.map((line: RawNode) => new Text(line));
    this.style = data.layoutStyle;
  }
}