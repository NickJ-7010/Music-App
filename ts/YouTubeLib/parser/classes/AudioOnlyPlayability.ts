import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class AudioOnlyPlayability extends YTNode {
  static type = 'AudioOnlyPlayability';

  audio_only_availability: string;

  constructor (data: RawNode) {
    super();
    this.audio_only_availability = data.audioOnlyAvailability;
  }
}