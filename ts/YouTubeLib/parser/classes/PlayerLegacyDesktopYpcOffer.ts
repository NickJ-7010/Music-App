import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class PlayerLegacyDesktopYpcOffer extends YTNode {
  static type = 'PlayerLegacyDesktopYpcOffer';

  title: string;
  thumbnail: string;
  offer_description: string;
  offer_id: string;

  constructor(data: RawNode) {
    super();
    this.title = data.itemTitle;
    this.thumbnail = data.itemThumbnail;
    this.offer_description = data.offerDescription;
    this.offer_id = data.offerId;
  }
}