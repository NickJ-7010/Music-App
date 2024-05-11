import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Button from './Button';
import NavigationEndpoint from './NavigationEndpoint';
import { Text } from '../misc';

export default class TranscriptSearchBox extends YTNode {
  static type = 'TranscriptSearchBox';

  formatted_placeholder: Text;
  clear_button: Button | null;
  endpoint: NavigationEndpoint;
  search_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.formatted_placeholder = new Text(data.formattedPlaceholder);
    this.clear_button = Parser.parseItem(data.clearButton, Button);
    this.endpoint = new NavigationEndpoint(data.onTextChangeCommand);
    this.search_button = Parser.parseItem(data.searchButton, Button);
  }
}