import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class PlaylistMetadata extends YTNode {
  static type = 'PlaylistMetadata';

  title: string;
  description: string;

  constructor(data: RawNode) {
    super();
    this.title = data.title;
    this.description = data.description || null;
    // XXX: Appindexing should be in microformat.
  }
}