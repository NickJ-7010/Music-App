import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import TranscriptFooter from './TranscriptFooter';
import TranscriptSearchBox from './TranscriptSearchBox';
import TranscriptSegmentList from './TranscriptSegmentList';

export default class TranscriptSearchPanel extends YTNode {
  static type = 'TranscriptSearchPanel';

  header: TranscriptSearchBox | null;
  body: TranscriptSegmentList | null;
  footer: TranscriptFooter | null;
  target_id: string;

  constructor(data: RawNode) {
    super();
    this.header = Parser.parseItem(data.header, TranscriptSearchBox);
    this.body = Parser.parseItem(data.body, TranscriptSegmentList);
    this.footer = Parser.parseItem(data.footer, TranscriptFooter);
    this.target_id = data.targetId;
  }
}