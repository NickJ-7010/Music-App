import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Factoid from './Factoid';

export default class UploadTimeFactoid extends YTNode {
  static type = 'UploadTimeFactoid';

  factoid: Factoid | null;

  constructor(data: RawNode) {
    super();
    this.factoid = Parser.parseItem(data.factoid, Factoid);
  }
}