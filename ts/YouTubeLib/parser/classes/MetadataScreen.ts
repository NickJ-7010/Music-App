import { Parser, type RawNode } from '../index';
import { YTNode } from '../helpers';

export default class MetadataScreen extends YTNode {
  static type = 'MetadataScreen';

  section_list: YTNode;

  constructor (data: RawNode) {
    super();
    this.section_list = Parser.parseItem(data);
  }
}