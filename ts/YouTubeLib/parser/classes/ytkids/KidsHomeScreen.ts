import { Parser } from '../../index';
import AnchoredSection from './AnchoredSection';
import { type ObservedArray, YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class KidsHomeScreen extends YTNode {
  static type = 'kidsHomeScreen';

  anchors: ObservedArray<AnchoredSection>;

  constructor(data: RawNode) {
    super();
    this.anchors = Parser.parseArray(data.anchors, AnchoredSection);
  }
}