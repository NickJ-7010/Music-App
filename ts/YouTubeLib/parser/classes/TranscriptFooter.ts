import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import SortFilterSubMenu from './SortFilterSubMenu';

export default class TranscriptFooter extends YTNode {
  static type = 'TranscriptFooter';

  language_menu: SortFilterSubMenu | null;

  constructor(data: RawNode) {
    super();
    this.language_menu = Parser.parseItem(data.languageMenu, SortFilterSubMenu);
  }
}