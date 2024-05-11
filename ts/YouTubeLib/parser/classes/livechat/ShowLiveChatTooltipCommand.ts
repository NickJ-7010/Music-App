import { Parser } from '../../index';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class ShowLiveChatTooltipCommand extends YTNode {
  static type = 'ShowLiveChatTooltipCommand';

  tooltip: YTNode;

  constructor(data: RawNode) {
    super();
    this.tooltip = Parser.parseItem(data.tooltip);
  }
}