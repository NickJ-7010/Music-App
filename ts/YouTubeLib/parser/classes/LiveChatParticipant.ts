import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class LiveChatParticipant extends YTNode {
  static type = 'LiveChatParticipant';

  name: Text;
  photo: Thumbnail[];
  badges: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.name = new Text(data.authorName);
    this.photo = Thumbnail.fromResponse(data.authorPhoto);
    this.badges = Parser.parseArray(data.authorBadges);
  }
}