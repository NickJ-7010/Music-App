import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import ExpandableVideoDescriptionBody from './ExpandableVideoDescriptionBody';
import HorizontalCardList from './HorizontalCardList';
import VideoDescriptionHeader from './VideoDescriptionHeader';
import VideoDescriptionInfocardsSection from './VideoDescriptionInfocardsSection';
import VideoDescriptionMusicSection from './VideoDescriptionMusicSection';
import VideoDescriptionTranscriptSection from './VideoDescriptionTranscriptSection';
import VideoDescriptionCourseSection from './VideoDescriptionCourseSection';
import ReelShelf from './ReelShelf';

export default class StructuredDescriptionContent extends YTNode {
  static type = 'StructuredDescriptionContent';

  items: ObservedArray<
    VideoDescriptionHeader | ExpandableVideoDescriptionBody | VideoDescriptionMusicSection |
    VideoDescriptionInfocardsSection | VideoDescriptionTranscriptSection | VideoDescriptionTranscriptSection |
    VideoDescriptionCourseSection | HorizontalCardList | ReelShelf
  >;

  constructor(data: RawNode) {
    super();
    this.items = Parser.parseArray(data.items, [
      VideoDescriptionHeader, ExpandableVideoDescriptionBody, VideoDescriptionMusicSection,
      VideoDescriptionInfocardsSection, VideoDescriptionCourseSection, VideoDescriptionTranscriptSection,
      VideoDescriptionTranscriptSection, HorizontalCardList, ReelShelf
    ]);
  }
}