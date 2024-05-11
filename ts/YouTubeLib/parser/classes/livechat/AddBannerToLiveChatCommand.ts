import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';
import LiveChatBanner from './items/LiveChatBanner';

export default class AddBannerToLiveChatCommand extends YTNode {
  static type = 'AddBannerToLiveChatCommand';

  banner: LiveChatBanner | null;

  constructor(data: RawNode) {
    super();
    this.banner = Parser.parseItem(data.bannerRenderer, LiveChatBanner);
  }
}