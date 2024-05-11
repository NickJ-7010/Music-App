import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Menu from './menus/Menu';
import Text from './misc/Text';

export default class EmergencyOnebox extends YTNode {
  static type = 'EmergencyOnebox';

  title: Text;
  first_option: YTNode;
  menu: Menu | null;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.first_option = Parser.parseItem(data.firstOption);
    this.menu = Parser.parseItem(data.menu, Menu);
  }
}