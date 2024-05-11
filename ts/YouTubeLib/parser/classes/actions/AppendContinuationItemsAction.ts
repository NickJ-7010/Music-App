import { Parser } from '../../index';
import type { RawNode } from '../../index';
import type { ObservedArray } from '../../helpers';
import { YTNode } from '../../helpers';

export default class AppendContinuationItemsAction extends YTNode {
  static type = 'AppendContinuationItemsAction';

  contents: ObservedArray<YTNode> | null;
  target: string;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parseArray(data.continuationItems);
    this.target = data.target;
  }
}