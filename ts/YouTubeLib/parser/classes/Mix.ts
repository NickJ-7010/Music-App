import type { RawNode } from '../index';
import Playlist from './Playlist';

export default class Mix extends Playlist {
  static type = 'Mix';

  constructor(data: RawNode) {
    super(data);
  }
}