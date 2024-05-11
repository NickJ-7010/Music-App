import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import SectionList from './SectionList';
import MusicQueue from './MusicQueue';
import RichGrid from './RichGrid';
import { YTNode } from '../helpers';

export default class Tab extends YTNode {
  static type = 'Tab';

  title: string;
  selected: boolean;
  endpoint: NavigationEndpoint;
  content: SectionList | MusicQueue | RichGrid | null;

  constructor(data: RawNode) {
    super();
    this.title = data.title || 'N/A';
    this.selected = !!data.selected;
    this.endpoint = new NavigationEndpoint(data.endpoint);
    this.content = Parser.parseItem(data.content, [ SectionList, MusicQueue, RichGrid ]);
  }
}