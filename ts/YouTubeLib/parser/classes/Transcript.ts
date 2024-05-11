import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import TranscriptSearchPanel from './TranscriptSearchPanel';

export default class Transcript extends YTNode {
  static type = 'Transcript';

  content: TranscriptSearchPanel | null;

  constructor(data: RawNode) {
    super();
    this.content = Parser.parseItem(data.content, TranscriptSearchPanel);
  }
}