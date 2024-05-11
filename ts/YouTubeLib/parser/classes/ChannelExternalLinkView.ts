import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class ChannelExternalLinkView extends YTNode {
  static type = 'ChannelExternalLinkView';

  title: Text;
  link: Text;
  favicon: Thumbnail[];

  constructor(data: RawNode) {
    super();

    this.title = Text.fromAttributed(data.title);
    this.link = Text.fromAttributed(data.link);
    this.favicon = Thumbnail.fromResponse(data.favicon);
  }
}