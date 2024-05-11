import type { ObservedArray } from '../../helpers';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';
import Text from '../misc/Text';
import MusicMenuItemDivider from './MusicMenuItemDivider';
import MusicMultiSelectMenuItem from './MusicMultiSelectMenuItem';

export default class MusicMultiSelectMenu extends YTNode {
  static type = 'MusicMultiSelectMenu';

  title?: Text;
  options: ObservedArray<MusicMultiSelectMenuItem | MusicMenuItemDivider>;

  constructor(data: RawNode) {
    super();
    if (Reflect.has(data, 'title') && Reflect.has(data.title, 'musicMenuTitleRenderer')) {
      this.title = new Text(data.title.musicMenuTitleRenderer?.primaryText);
    }

    this.options = Parser.parseArray(data.options, [ MusicMultiSelectMenuItem, MusicMenuItemDivider ]);
  }
}