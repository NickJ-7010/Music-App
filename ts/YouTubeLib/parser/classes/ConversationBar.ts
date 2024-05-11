import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Message from './Message';

export default class ConversationBar extends YTNode {
  static type = 'ConversationBar';

  availability_message: Message | null;

  constructor(data: RawNode) {
    super();
    this.availability_message = Parser.parseItem(data.availabilityMessage, Message);
  }
}