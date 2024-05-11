import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Button from './Button';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class SearchBox extends YTNode {
  static type = 'SearchBox';

  endpoint: NavigationEndpoint;
  search_button: Button | null;
  clear_button: Button | null;
  placeholder_text: Text;

  constructor(data: RawNode) {
    super();
    this.endpoint = new NavigationEndpoint(data.endpoint);
    this.search_button = Parser.parseItem(data.searchButton, Button);
    this.clear_button = Parser.parseItem(data.clearButton, Button);
    this.placeholder_text = new Text(data.placeholderText);
  }
}