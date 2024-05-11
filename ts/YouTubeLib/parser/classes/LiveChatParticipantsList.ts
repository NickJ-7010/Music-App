import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import LiveChatParticipant from './LiveChatParticipant';
import Text from './misc/Text';

export default class LiveChatParticipantsList extends YTNode {
  static type = 'LiveChatParticipantsList';

  title: Text;
  participants: ObservedArray<LiveChatParticipant>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.participants = Parser.parseArray(data.participants, LiveChatParticipant);
  }
}