import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class MusicCardShelfHeaderBasic extends YTNode {
  static type = 'MusicCardShelfHeaderBasic';

  title: Text;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
  }
}