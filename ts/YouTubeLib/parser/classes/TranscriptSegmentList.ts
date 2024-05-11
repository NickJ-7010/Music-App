import type { ObservedArray } from '../helpers';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import { Text } from '../misc';
import TranscriptSectionHeader from './TranscriptSectionHeader';
import TranscriptSegment from './TranscriptSegment';

export default class TranscriptSegmentList extends YTNode {
  static type = 'TranscriptSegmentList';

  initial_segments: ObservedArray<TranscriptSegment | TranscriptSectionHeader>;
  no_result_label: Text;
  retry_label: Text;
  touch_captions_enabled: boolean;

  constructor(data: RawNode) {
    super();
    this.initial_segments = Parser.parseArray(data.initialSegments, [ TranscriptSegment, TranscriptSectionHeader ]);
    this.no_result_label = new Text(data.noResultLabel);
    this.retry_label = new Text(data.retryLabel);
    this.touch_captions_enabled = data.touchCaptionsEnabled;
  }
}