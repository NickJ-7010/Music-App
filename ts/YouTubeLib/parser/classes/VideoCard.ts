import type { RawNode } from '../index';
import Video from './Video';

export default class VideoCard extends Video {
  static type = 'VideoCard';

  constructor(data: RawNode) {
    super(data);
  }
}