import { Parser } from '../../index';
import Button from '../Button';
import ToggleButton from '../ToggleButton';
import CreatorHeart from './CreatorHeart';

import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class CommentActionButtons extends YTNode {
  static type = 'CommentActionButtons';

  like_button: ToggleButton | null;
  dislike_button: ToggleButton | null;
  reply_button: Button | null;
  creator_heart: CreatorHeart | null;

  constructor(data: RawNode) {
    super();
    this.like_button = Parser.parseItem(data.likeButton, ToggleButton);
    this.dislike_button = Parser.parseItem(data.dislikeButton, ToggleButton);
    this.reply_button = Parser.parseItem(data.replyButton, Button);
    this.creator_heart = Parser.parseItem(data.creatorHeart, CreatorHeart);
  }
}