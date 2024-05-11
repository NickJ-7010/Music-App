import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Button from './Button';
import SortFilterSubMenu from './SortFilterSubMenu';
import Menu from './menus/Menu';

export default class LiveChatHeader extends YTNode {
  static type = 'LiveChatHeader';

  overflow_menu: Menu | null;
  collapse_button: Button | null;
  view_selector: SortFilterSubMenu | null;

  constructor(data: RawNode) {
    super();
    this.overflow_menu = Parser.parseItem(data.overflowMenu, Menu);
    this.collapse_button = Parser.parseItem(data.collapseButton, Button);
    this.view_selector = Parser.parseItem(data.viewSelector, SortFilterSubMenu);
  }
}