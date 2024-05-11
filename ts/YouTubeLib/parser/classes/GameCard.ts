import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class GameCard extends YTNode {
  static type = 'GameCard';

  game: YTNode;

  constructor(data: RawNode) {
    super();
    this.game = Parser.parseItem(data.game);
  }
}