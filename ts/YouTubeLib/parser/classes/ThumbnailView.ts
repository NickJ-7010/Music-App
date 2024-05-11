import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import ThumbnailHoverOverlayView from './ThumbnailHoverOverlayView';
import ThumbnailOverlayBadgeView from './ThumbnailOverlayBadgeView';
import Thumbnail from './misc/Thumbnail';

export default class ThumbnailView extends YTNode {
  static type = 'ThumbnailView';

  image: Thumbnail[];
  overlays: (ThumbnailOverlayBadgeView | ThumbnailHoverOverlayView)[];
  background_color: {
    light_theme: number;
    dark_theme: number;
  };

  constructor(data: RawNode) {
    super();

    this.image = Thumbnail.fromResponse(data.image);
    this.overlays = Parser.parseArray(data.overlays, [ ThumbnailOverlayBadgeView, ThumbnailHoverOverlayView ]);
    this.background_color = {
      light_theme: data.backgroundColor.lightTheme,
      dark_theme: data.backgroundColor.darkTheme
    };
  }
}