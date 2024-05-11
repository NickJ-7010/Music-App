import { YTNode } from '../helpers';
import { type RawNode } from '../index';
import Text from './misc/Text';

export default class ThumbnailOverlayPlaybackStatus extends YTNode {
  static type = 'ThumbnailOverlayPlaybackStatus';

  texts: Text[];

  constructor(data: RawNode) {
    super();
    this.texts = data.texts.map((text: RawNode) => new Text(text));
  }
}