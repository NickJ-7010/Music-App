import { Parser, type RawNode } from '../index';
import Text from './misc/Text';
import { type ObservedArray, YTNode } from '../helpers';
import SubFeedOption from './SubFeedOption';

export default class SubFeedSelector extends YTNode {
  static type = 'SubFeedSelector';

  title: Text;
  options: ObservedArray<SubFeedOption>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.options = Parser.parseArray(data.options, SubFeedOption);
  }
}