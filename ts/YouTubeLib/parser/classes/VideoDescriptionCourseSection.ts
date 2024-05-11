import type { ObservedArray } from '../helpers';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import StructuredDescriptionPlaylistLockup from './StructuredDescriptionPlaylistLockup';
import Text from './misc/Text';

export default class VideoDescriptionCourseSection extends YTNode {
  static type = 'VideoDescriptionCourseSection';

  section_title: Text;
  media_lockups: ObservedArray<StructuredDescriptionPlaylistLockup>;

  constructor(data: RawNode) {
    super();
    this.section_title = new Text(data.sectionTitle);
    this.media_lockups = Parser.parseArray(data.mediaLockups, [ StructuredDescriptionPlaylistLockup ]);
  }
}