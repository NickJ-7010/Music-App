import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import ClipSection from './ClipSection';
import ContinuationItem from './ContinuationItem';
import EngagementPanelTitleHeader from './EngagementPanelTitleHeader';
import MacroMarkersList from './MacroMarkersList';
import ProductList from './ProductList';
import SectionList from './SectionList';
import StructuredDescriptionContent from './StructuredDescriptionContent';
import VideoAttributeView from './VideoAttributeView';

export default class EngagementPanelSectionList extends YTNode {
  static type = 'EngagementPanelSectionList';

  header: EngagementPanelTitleHeader | null;
  content: VideoAttributeView | SectionList | ContinuationItem | ClipSection | StructuredDescriptionContent | MacroMarkersList | ProductList | null;
  target_id?: string;
  panel_identifier?: string;
  identifier?: {
    surface: string,
    tag: string
  };
  visibility?: string;

  constructor(data: RawNode) {
    super();
    this.header = Parser.parseItem(data.header, EngagementPanelTitleHeader);
    this.content = Parser.parseItem(data.content, [ VideoAttributeView, SectionList, ContinuationItem, ClipSection, StructuredDescriptionContent, MacroMarkersList, ProductList ]);
    this.panel_identifier = data.panelIdentifier;
    this.identifier = data.identifier ? {
      surface: data.identifier.surface,
      tag: data.identifier.tag
    } : undefined;
    this.target_id = data.targetId;
    this.visibility = data.visibility;
  }
}