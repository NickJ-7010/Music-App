import { Parser, type RawNode } from '../index';
import PlaylistPanel from './PlaylistPanel';
import { YTNode } from '../helpers';

export default class MusicQueue extends YTNode {
  static type = 'MusicQueue';

  content: PlaylistPanel | null;

  constructor(data: RawNode) {
    super();
    this.content = Parser.parseItem(data.content, PlaylistPanel);
  }
}