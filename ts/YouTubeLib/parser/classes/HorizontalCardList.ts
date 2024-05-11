import { Parser, type RawNode } from '../index';
import { type ObservedArray, YTNode } from '../helpers';
import SearchRefinementCard from './SearchRefinementCard';
import Button from './Button';
import MacroMarkersListItem from './MacroMarkersListItem';
import GameCard from './GameCard';
import VideoCard from './VideoCard';
import VideoAttributeView from './VideoAttributeView';

export default class HorizontalCardList extends YTNode {
  static type = 'HorizontalCardList';

  cards: ObservedArray<VideoAttributeView | SearchRefinementCard | MacroMarkersListItem | GameCard | VideoCard>;
  header: YTNode;
  previous_button: Button | null;
  next_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.cards = Parser.parseArray(data.cards, [ VideoAttributeView, SearchRefinementCard, MacroMarkersListItem, GameCard, VideoCard ]);
    this.header = Parser.parseItem(data.header);
    this.previous_button = Parser.parseItem(data.previousButton, Button);
    this.next_button = Parser.parseItem(data.nextButton, Button);
  }
}