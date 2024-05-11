import { YTNode, type SuperParsedResult } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';

export default class MultiPageMenu extends YTNode {
  static type = 'MultiPageMenu';

  header: SuperParsedResult<YTNode>;
  sections: SuperParsedResult<YTNode>;
  style: string;

  constructor(data: RawNode) {
    super();
    this.header = Parser.parse(data.header);
    this.sections = Parser.parse(data.sections);
    this.style = data.style;
  }
}