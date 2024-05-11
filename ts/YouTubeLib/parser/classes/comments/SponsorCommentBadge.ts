import Thumbnail from '../misc/Thumbnail';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class SponsorCommentBadge extends YTNode {
  static type = 'SponsorCommentBadge';

  custom_badge: Thumbnail[];
  tooltip: string;

  constructor(data: RawNode) {
    super();
    this.custom_badge = Thumbnail.fromResponse(data.customBadge);
    this.tooltip = data.tooltip;
  }
}