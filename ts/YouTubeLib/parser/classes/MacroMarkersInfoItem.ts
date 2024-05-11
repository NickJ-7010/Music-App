import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Menu from './menus/Menu';
import Text from './misc/Text';

export default class MacroMarkersInfoItem extends YTNode {
  static type = 'MacroMarkersInfoItem';

  info_text: Text;
  menu: Menu | null;

  constructor(data: RawNode) {
    super();
    this.info_text = new Text(data.infoText);
    this.menu = Parser.parseItem(data.menu, Menu);
  }
}