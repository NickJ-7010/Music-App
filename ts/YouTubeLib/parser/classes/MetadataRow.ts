import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class MetadataRow extends YTNode {
  static type = 'MetadataRow';

  title: Text;
  contents: Text[];

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.contents = data.contents.map((content: RawNode) => new Text(content));
  }
}