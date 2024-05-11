import { type ObservedArray, YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Text from './misc/Text';
import SearchFilterGroup from './SearchFilterGroup';
import ToggleButton from './ToggleButton';

export default class SearchSubMenu extends YTNode {
  static type = 'SearchSubMenu';

  title?: Text;
  groups?: ObservedArray<SearchFilterGroup>;
  button?: ToggleButton | null;

  constructor(data: RawNode) {
    super();
    if (Reflect.has(data, 'title'))
      this.title = new Text(data.title);

    if (Reflect.has(data, 'groups'))
      this.groups = Parser.parseArray(data.groups, SearchFilterGroup);

    if (Reflect.has(data, 'button'))
      this.button = Parser.parseItem(data.button, ToggleButton);
  }
}