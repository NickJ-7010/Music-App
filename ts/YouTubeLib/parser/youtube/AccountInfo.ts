import { Parser } from '../index';
import { InnertubeError } from '../../utils/Utils';
import AccountSectionList from '../classes/AccountSectionList';

import type { ApiResponse } from '../../core/index';
import type { IParsedResponse } from '../types/index';
import type AccountItemSection from '../classes/AccountItemSection';
import type AccountChannel from '../classes/AccountChannel';

class AccountInfo {
  #page: IParsedResponse;

  contents: AccountItemSection | null;
  footers: AccountChannel | null;

  constructor(response: ApiResponse) {
    this.#page = Parser.parseResponse(response.data);

    if (!this.#page.contents)
      throw new InnertubeError('Page contents not found');

    const account_section_list = this.#page.contents.array().as(AccountSectionList).first();

    if (!account_section_list)
      throw new InnertubeError('Account section list not found');

    this.contents = account_section_list.contents;
    this.footers = account_section_list.footers;
  }

  get page(): IParsedResponse {
    return this.#page;
  }
}

export default AccountInfo;