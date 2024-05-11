import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class Chapter extends YTNode {
  static type = 'Chapter';

  title: Text;
  time_range_start_millis: number;
  thumbnail: Thumbnail[];

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.time_range_start_millis = data.timeRangeStartMillis;
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
  }
}