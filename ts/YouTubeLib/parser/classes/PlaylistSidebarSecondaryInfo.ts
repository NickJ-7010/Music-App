import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';

export default class PlaylistSidebarSecondaryInfo extends YTNode {
  static type = 'PlaylistSidebarSecondaryInfo';

  owner: YTNode;
  button: YTNode;

  constructor(data: RawNode) {
    super();
    this.owner = Parser.parseItem(data.videoOwner);
    this.button = Parser.parseItem(data.button);
  }
}