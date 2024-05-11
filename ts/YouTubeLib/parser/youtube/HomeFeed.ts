import FilterableFeed from '../../core/mixins/FilterableFeed';
import FeedTabbedHeader from '../classes/FeedTabbedHeader';
import RichGrid from '../classes/RichGrid';

import type { IBrowseResponse } from '../types/index';
import type { AppendContinuationItemsAction, ReloadContinuationItemsCommand } from '../index';
import type { ApiResponse, Actions } from '../../core/index';
import type ChipCloudChip from '../classes/ChipCloudChip';

export default class HomeFeed extends FilterableFeed<IBrowseResponse> {
  contents: RichGrid | AppendContinuationItemsAction | ReloadContinuationItemsCommand;
  header: FeedTabbedHeader;

  constructor(actions: Actions, data: ApiResponse | IBrowseResponse, already_parsed = false) {
    super(actions, data, already_parsed);
    this.header = this.memo.getType(FeedTabbedHeader).first();
    this.contents = this.memo.getType(RichGrid).first() || this.page.on_response_received_actions.first();
  }

  /**
   * Applies given filter to the feed. Use {@link filters} to get available filters.
   * @param filter - Filter to apply.
   */
  async applyFilter(filter: string | ChipCloudChip): Promise<HomeFeed> {
    const feed = await super.getFilteredFeed(filter);
    return new HomeFeed(this.actions, feed.page, true);
  }

  /**
   * Retrieves next batch of contents.
   */
  async getContinuation(): Promise<HomeFeed> {
    const feed = await super.getContinuation();

    // Keep the page header
    feed.page.header = this.page.header;
    feed.page.header_memo?.set(this.header.type, [ this.header ]);

    return new HomeFeed(this.actions, feed.page, true);
  }
}