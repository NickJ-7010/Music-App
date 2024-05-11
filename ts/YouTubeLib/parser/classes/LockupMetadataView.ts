import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import ContentMetadataView from './ContentMetadataView';
import Text from './misc/Text';

export default class LockupMetadataView extends YTNode {
  static type = 'LockupMetadataView';

  title: Text;
  metadata: ContentMetadataView | null;

  constructor(data: RawNode) {
    super();

    this.title = Text.fromAttributed(data.title);
    this.metadata = Parser.parseItem(data.metadata, ContentMetadataView);
  }
}