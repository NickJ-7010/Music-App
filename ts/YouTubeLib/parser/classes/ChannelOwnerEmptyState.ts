import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class ChannelOwnerEmptyState extends YTNode {
  static type = 'ChannelOwnerEmptyState';

  illustration: Thumbnail[];
  description: Text;

  constructor(data: RawNode) {
    super();
    this.illustration = Thumbnail.fromResponse(data.illustration);
    this.description = new Text(data.description);
  }
}