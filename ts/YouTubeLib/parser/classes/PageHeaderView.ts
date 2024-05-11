import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import ContentMetadataView from './ContentMetadataView';
import ContentPreviewImageView from './ContentPreviewImageView';
import DecoratedAvatarView from './DecoratedAvatarView';
import DynamicTextView from './DynamicTextView';
import FlexibleActionsView from './FlexibleActionsView';
import DescriptionPreviewView from './DescriptionPreviewView';
import AttributionView from './AttributionView';
import ImageBannerView from './ImageBannerView';

export default class PageHeaderView extends YTNode {
  static type = 'PageHeaderView';

  title: DynamicTextView | null;
  image: ContentPreviewImageView | DecoratedAvatarView | null;
  metadata: ContentMetadataView | null;
  actions: FlexibleActionsView | null;
  description: DescriptionPreviewView | null;
  attributation: AttributionView | null;
  banner: ImageBannerView | null;

  constructor(data: RawNode) {
    super();
    this.title = Parser.parseItem(data.title, DynamicTextView);
    this.image = Parser.parseItem(data.image, [ ContentPreviewImageView, DecoratedAvatarView ]);
    this.metadata = Parser.parseItem(data.metadata, ContentMetadataView);
    this.actions = Parser.parseItem(data.actions, FlexibleActionsView);
    this.description = Parser.parseItem(data.description, DescriptionPreviewView);
    this.attributation = Parser.parseItem(data.attributation, AttributionView);
    this.banner = Parser.parseItem(data.banner, ImageBannerView);
  }
}