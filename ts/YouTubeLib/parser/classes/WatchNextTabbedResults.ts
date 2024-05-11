import type { RawNode } from '../index';
import TwoColumnBrowseResults from './TwoColumnBrowseResults';

export default class WatchNextTabbedResults extends TwoColumnBrowseResults {
  static type = 'WatchNextTabbedResults';

  constructor(data: RawNode) {
    super(data);
  }
}