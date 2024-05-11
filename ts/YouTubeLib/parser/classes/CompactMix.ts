import type { RawNode } from '../index';
import Playlist from './Playlist';

export default class CompactMix extends Playlist {
  static type = 'CompactMix';

  constructor(data: RawNode) {
    super(data);
  }
}