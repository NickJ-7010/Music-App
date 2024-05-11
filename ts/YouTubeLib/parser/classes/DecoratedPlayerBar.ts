import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Button from './Button';
import MultiMarkersPlayerBar from './MultiMarkersPlayerBar';

export default class DecoratedPlayerBar extends YTNode {
  static type = 'DecoratedPlayerBar';

  player_bar: MultiMarkersPlayerBar | null;
  player_bar_action_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.player_bar = Parser.parseItem(data.playerBar, MultiMarkersPlayerBar);
    this.player_bar_action_button = Parser.parseItem(data.playerBarActionButton, Button);
  }
}