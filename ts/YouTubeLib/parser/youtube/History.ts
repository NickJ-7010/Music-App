import Feed from '../../core/mixins/Feed';
import ItemSection from '../classes/ItemSection';
import BrowseFeedActions from '../classes/BrowseFeedActions';

import type { Actions, ApiResponse } from '../../core/index';
import type { IBrowseResponse } from '../types/index';

// TODO: make feed actions usable
class History extends Feed<IBrowseResponse> {
  sections: ItemSection[];
  feed_actions: BrowseFeedActions;

  constructor(actions: Actions, data: ApiResponse | IBrowseResponse, already_parsed = false) {
    super(actions, data, already_parsed);
    this.sections = this.memo.getType(ItemSection);
    this.feed_actions = this.memo.getType(BrowseFeedActions).first();
  }

  /**
   * Retrieves next batch of contents.
   */
  async getContinuation(): Promise<History> {
    const response = await this.getContinuationData();
    if (!response)
      throw new Error('No continuation data found');
    return new History(this.actions, response, true);
  }
}

export default History;