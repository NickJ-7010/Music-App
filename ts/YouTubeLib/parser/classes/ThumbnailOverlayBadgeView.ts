import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import ThumbnailBadgeView from './ThumbnailBadgeView';

export default class ThumbnailOverlayBadgeView extends YTNode {
  static type = 'ThumbnailOverlayBadgeView';

  badges: ThumbnailBadgeView[];
  position: string;

  constructor(data: RawNode) {
    super();

    this.badges = Parser.parseArray(data.thumbnailBadges, ThumbnailBadgeView);
    this.position = data.position;
  }
}