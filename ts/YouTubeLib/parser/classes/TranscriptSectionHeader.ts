import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class TranscriptSectionHeader extends YTNode {
  static type = 'TranscriptSectionHeader';

  start_ms: string;
  end_ms: string;
  snippet: Text;

  constructor(data: RawNode) {
    super();
    this.start_ms = data.startMs;
    this.end_ms = data.endMs;
    this.snippet = new Text(data.snippet);
  }
}