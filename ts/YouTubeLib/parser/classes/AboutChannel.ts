import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import AboutChannelView from './AboutChannelView';
import Button from './Button';

export default class AboutChannel extends YTNode {
  static type = 'AboutChannel';

  metadata: AboutChannelView | null;
  share_channel: Button | null;

  constructor(data: RawNode) {
    super();

    this.metadata = Parser.parseItem(data.metadata, AboutChannelView);
    this.share_channel = Parser.parseItem(data.shareChannel, Button);
  }
}