import type { RawNode } from '../index';
import BackstagePost from './BackstagePost';

export default class Post extends BackstagePost {
  static type = 'Post';

  constructor(data: RawNode) {
    super(data);
  }
}