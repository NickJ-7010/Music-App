import type { ObservedArray } from '../helpers';
import { YTNode } from '../helpers';

import ClipCreation from './ClipCreation';

import { Parser } from '../index';

import type { RawNode } from '../types/index';

export default class ClipSection extends YTNode {
  static type = 'ClipSection';

  contents: ObservedArray<ClipCreation> | null;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parse(data.contents, true, [ ClipCreation ]);
  }
}
