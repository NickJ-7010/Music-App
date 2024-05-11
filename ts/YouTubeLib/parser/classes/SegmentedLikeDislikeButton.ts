import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Button from './Button';
import ToggleButton from './ToggleButton';

export default class SegmentedLikeDislikeButton extends YTNode {
  static type = 'SegmentedLikeDislikeButton';

  like_button: ToggleButton | Button | null;
  dislike_button: ToggleButton | Button | null;

  constructor (data: RawNode) {
    super();
    this.like_button = Parser.parseItem(data.likeButton, [ ToggleButton, Button ]);
    this.dislike_button = Parser.parseItem(data.dislikeButton, [ ToggleButton, Button ]);
  }
}