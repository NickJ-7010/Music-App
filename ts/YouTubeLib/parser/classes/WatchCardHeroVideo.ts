import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';

export default class WatchCardHeroVideo extends YTNode {
  static type = 'WatchCardHeroVideo';

  endpoint: NavigationEndpoint;
  call_to_action_button: YTNode;
  hero_image: YTNode;
  label: string;

  constructor(data: RawNode) {
    super();
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.call_to_action_button = Parser.parseItem(data.callToActionButton);
    this.hero_image = Parser.parseItem(data.heroImage);
    this.label = data.lengthText?.accessibility.accessibilityData.label || '';
  }
}