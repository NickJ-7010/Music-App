import { Parser } from '../index';
import { InnertubeError } from '../../utils/Utils';

import ContinuationItem from '../classes/ContinuationItem';
import SimpleMenuHeader from '../classes/menus/SimpleMenuHeader';
import Notification from '../classes/Notification';

import type { ApiResponse, Actions } from '../../core/index';
import type { IGetNotificationsMenuResponse } from '../types/index';

class NotificationsMenu {
  #page: IGetNotificationsMenuResponse;
  #actions: Actions;

  header: SimpleMenuHeader;
  contents: Notification[];

  constructor(actions: Actions, response: ApiResponse) {
    this.#actions = actions;
    this.#page = Parser.parseResponse<IGetNotificationsMenuResponse>(response.data);

    this.header = this.#page.actions_memo.getType(SimpleMenuHeader).first();
    this.contents = this.#page.actions_memo.getType(Notification);
  }

  async getContinuation(): Promise<NotificationsMenu> {
    const continuation = this.#page.actions_memo.getType(ContinuationItem).first();

    if (!continuation)
      throw new InnertubeError('Continuation not found');

    const response = await continuation.endpoint.call(this.#actions, { parse: false });

    return new NotificationsMenu(this.#actions, response);
  }

  get page(): IGetNotificationsMenuResponse {
    return this.#page;
  }
}

export default NotificationsMenu;