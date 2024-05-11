import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class ChannelHeaderLinksView extends YTNode {
  static type = 'ChannelHeaderLinksView';

  first_link?: Text;
  more?: Text;

  constructor(data: RawNode) {
    super();

    if (Reflect.has(data, 'firstLink')) {
      this.first_link = Text.fromAttributed(data.firstLink);
    }

    if (Reflect.has(data, 'more')) {
      this.more = Text.fromAttributed(data.more);
    }
  }
}