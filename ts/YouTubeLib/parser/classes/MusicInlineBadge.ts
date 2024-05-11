import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class MusicInlineBadge extends YTNode {
  static type = 'MusicInlineBadge';

  icon_type: string;
  label: string;

  constructor(data: RawNode) {
    super();
    this.icon_type = data.icon.iconType;
    this.label = data.accessibilityData.accessibilityData.label;
  }
}