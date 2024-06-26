import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class SingleColumnMusicWatchNextResults extends YTNode {
  static type = 'SingleColumnMusicWatchNextResults';

  contents;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parse(data);
  }
}