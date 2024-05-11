import { Parser } from '../index';
import GuideSection from '../classes/GuideSection';
import GuideSubscriptionsSection from '../classes/GuideSubscriptionsSection';

import type { ObservedArray } from '../helpers';
import type { IGuideResponse } from '../types/index';
import type { IRawResponse } from '../index';

export default class Guide {

  #page: IGuideResponse;
  contents: ObservedArray<GuideSection | GuideSubscriptionsSection>;

  constructor(data: IRawResponse) {
    this.#page = Parser.parseResponse<IGuideResponse>(data);
    this.contents = this.#page.items.array().as(GuideSection, GuideSubscriptionsSection);
  }

  get page(): IGuideResponse {
    return this.#page;
  }
}