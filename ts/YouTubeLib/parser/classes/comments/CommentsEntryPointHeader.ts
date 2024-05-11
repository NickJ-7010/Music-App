import Text from '../misc/Text';
import Thumbnail from '../misc/Thumbnail';
import CommentsSimplebox from './CommentsSimplebox';
import CommentsEntryPointTeaser from './CommentsEntryPointTeaser';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';

export default class CommentsEntryPointHeader extends YTNode {
  static type = 'CommentsEntryPointHeader';

  header?: Text;
  comment_count?: Text;
  teaser_avatar?: Thumbnail[];
  teaser_content?: Text;
  content_renderer?: CommentsEntryPointTeaser | CommentsSimplebox | null;
  simplebox_placeholder?: Text;

  constructor(data: RawNode) {
    super();

    if (Reflect.has(data, 'headerText')) {
      this.header = new Text(data.headerText);
    }

    if (Reflect.has(data, 'commentCount')) {
      this.comment_count = new Text(data.commentCount);
    }

    if (Reflect.has(data, 'teaserAvatar') || Reflect.has(data, 'simpleboxAvatar')) {
      this.teaser_avatar = Thumbnail.fromResponse(data.teaserAvatar || data.simpleboxAvatar);
    }

    if (Reflect.has(data, 'teaserContent')) {
      this.teaser_content = new Text(data.teaserContent);
    }

    if (Reflect.has(data, 'contentRenderer')) {
      this.content_renderer = Parser.parseItem(data.contentRenderer, [ CommentsEntryPointTeaser, CommentsSimplebox ]);
    }

    if (Reflect.has(data, 'simpleboxPlaceholder')) {
      this.simplebox_placeholder = new Text(data.simpleboxPlaceholder);
    }
  }
}