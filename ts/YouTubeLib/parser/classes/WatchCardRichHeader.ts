import { YTNode } from '../helpers';
import { type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Author from './misc/Author';
import Text from './misc/Text';

export default class WatchCardRichHeader extends YTNode {
  static type = 'WatchCardRichHeader';

  title: Text;
  title_endpoint: NavigationEndpoint;
  subtitle: Text;
  author: Author;
  style: string;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.title_endpoint = new NavigationEndpoint(data.titleNavigationEndpoint);
    this.subtitle = new Text(data.subtitle);
    this.author = new Author(data, data.titleBadge ? [ data.titleBadge ] : null, data.avatar);
    this.author.name = this.title.toString();
    this.style = data.style;
  }
}