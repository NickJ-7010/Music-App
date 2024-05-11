import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import ThumbnailView from './ThumbnailView';

export default class CollectionThumbnailView extends YTNode {
  static type = 'CollectionThumbnailView';

  primary_thumbnail: ThumbnailView | null;
  stack_color: {
    light_theme: number;
    dark_theme: number;
  };

  constructor(data: RawNode) {
    super();

    this.primary_thumbnail = Parser.parseItem(data.primaryThumbnail, ThumbnailView);
    this.stack_color = {
      light_theme: data.stackColor.lightTheme,
      dark_theme: data.stackColor.darkTheme
    };
  }
}