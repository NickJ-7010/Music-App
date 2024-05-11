import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import { Text, Thumbnail } from '../misc';
import Button from './Button';
import NavigationEndpoint from './NavigationEndpoint';

export default class ProductListItem extends YTNode {
  static type = 'ProductListItem';

  title: Text;
  accessibility_title: string;
  thumbnail: Thumbnail[];
  price: string;
  endpoint: NavigationEndpoint;
  merchant_name: string;
  stay_in_app: boolean;
  view_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.accessibility_title = data.accessibilityTitle;
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
    this.price = data.price;
    this.endpoint = new NavigationEndpoint(data.onClickCommand);
    this.merchant_name = data.merchantName;
    this.stay_in_app = !!data.stayInApp;
    this.view_button = Parser.parseItem(data.viewButton, Button);
  }
}