import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import InfoPanelContent from './InfoPanelContent';
import Menu from './menus/Menu';
import Text from './misc/Text';

export default class InfoPanelContainer extends YTNode {
  static type = 'InfoPanelContainer';

  title: Text;
  menu: Menu | null;
  content: InfoPanelContent | null;
  background: string;
  icon_type?: string;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.menu = Parser.parseItem(data.menu, Menu);
    this.content = Parser.parseItem(data.content, InfoPanelContent);
    this.background = data.background;

    if (Reflect.has(data, 'icon')) {
      this.icon_type = data.icon?.iconType;
    }
  }
}