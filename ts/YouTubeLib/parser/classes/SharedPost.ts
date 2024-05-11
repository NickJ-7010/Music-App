import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import * as Parser from '../parser';
import BackstagePost from './BackstagePost';
import Button from './Button';
import Menu from './menus/Menu';
import Author from './misc/Author';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';
import NavigationEndpoint from './NavigationEndpoint';

export default class SharedPost extends YTNode {
  static type = 'SharedPost';

  thumbnail: Thumbnail[];
  content: Text;
  published: Text;
  menu: Menu | null;
  original_post: BackstagePost | null;
  id: string;
  endpoint: NavigationEndpoint;
  expand_button: Button | null;
  author: Author;

  constructor(data: RawNode) {
    super();
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
    this.content = new Text(data.content);
    this.published = new Text(data.publishedTimeText);
    this.menu = Parser.parseItem(data.actionMenu, Menu);
    this.original_post = Parser.parseItem(data.originalPost, BackstagePost);
    this.id = data.postId;
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.expand_button = Parser.parseItem(data.expandButton, Button);
    this.author = new Author(data.displayName, undefined);
  }
}