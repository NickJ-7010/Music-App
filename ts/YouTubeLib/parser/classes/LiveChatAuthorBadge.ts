import type { RawNode } from '../index';
import MetadataBadge from './MetadataBadge';
import Thumbnail from './misc/Thumbnail';

export default class LiveChatAuthorBadge extends MetadataBadge {
  static type = 'LiveChatAuthorBadge';

  custom_thumbnail: Thumbnail[];

  constructor(data: RawNode) {
    super(data);
    this.custom_thumbnail = Thumbnail.fromResponse(data.customThumbnail);
  }
}