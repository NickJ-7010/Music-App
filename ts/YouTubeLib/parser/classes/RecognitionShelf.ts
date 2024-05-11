import { Parser, type RawNode } from '../index';
import { YTNode } from '../helpers';
import Button from './Button';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class RecognitionShelf extends YTNode {
  static type = 'RecognitionShelf';

  title: Text;
  subtitle: Text;
  avatars: Thumbnail[];
  button: Button | null;
  surface: string;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.subtitle = new Text(data.subtitle);
    this.avatars = data.avatars.map((avatar: RawNode) => new Thumbnail(avatar));
    this.button = Parser.parseItem(data.button, Button);
    this.surface = data.surface;
  }
}