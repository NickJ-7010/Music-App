import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import PlayerOverflow from './PlayerOverflow';

export default class PlayerControlsOverlay extends YTNode {
  static type = 'PlayerControlsOverlay';

  overflow: PlayerOverflow | null;

  constructor(data: RawNode) {
    super();
    this.overflow = Parser.parseItem(data.overflow, PlayerOverflow);
  }
}