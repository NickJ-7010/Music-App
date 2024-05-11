import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import ChipView from './ChipView';

export default class ChipBarView extends YTNode {
  static type = 'ChipBarView';

  chips: ObservedArray<ChipView> | null;

  constructor(data: RawNode) {
    super();
    this.chips = Parser.parseArray(data.chips, ChipView);
  }
}