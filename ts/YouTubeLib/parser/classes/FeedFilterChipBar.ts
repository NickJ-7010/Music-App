import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import ChipCloudChip from './ChipCloudChip';

export default class FeedFilterChipBar extends YTNode {
  static type = 'FeedFilterChipBar';

  contents: ObservedArray<ChipCloudChip>;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parseArray(data.contents, ChipCloudChip);
  }
}