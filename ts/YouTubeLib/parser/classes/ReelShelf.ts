import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class ReelShelf extends YTNode {
  static type = 'ReelShelf';

  title: Text;
  items: ObservedArray<YTNode>;
  endpoint?: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.items = Parser.parseArray(data.items);

    if (Reflect.has(data, 'endpoint')) {
      this.endpoint = new NavigationEndpoint(data.endpoint);
    }
  }

  // XXX: Alias for consistency.
  get contents() {
    return this.items;
  }
}