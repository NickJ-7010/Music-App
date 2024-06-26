import { type ObservedArray, YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Text from './misc/Text';

export default class ChannelFeaturedContent extends YTNode {
  static type = 'ChannelFeaturedContent';

  title: Text;
  items: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.items = Parser.parseArray(data.items);
  }
}