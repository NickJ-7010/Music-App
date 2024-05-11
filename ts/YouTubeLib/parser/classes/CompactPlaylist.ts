import type { RawNode } from '../index';
import Playlist from './Playlist';

class CompactPlaylist extends Playlist {
  static type = 'CompactPlaylist';

  constructor(data: RawNode) {
    super(data);
  }
}

export default CompactPlaylist;