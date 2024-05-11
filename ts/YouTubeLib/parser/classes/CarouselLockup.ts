import { type ObservedArray, YTNode } from '../helpers';
import InfoRow from './InfoRow';
import { Parser, type RawNode } from '../index';
import CompactVideo from './CompactVideo';

export default class CarouselLockup extends YTNode {
  static type = 'CarouselLockup';

  info_rows: ObservedArray<InfoRow>;
  video_lockup?: CompactVideo | null;

  constructor(data: RawNode) {
    super();
    this.info_rows = Parser.parseArray(data.infoRows, InfoRow);
    this.video_lockup = Parser.parseItem(data.videoLockup, CompactVideo);
  }
}
