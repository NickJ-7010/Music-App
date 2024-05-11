import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';

export default class Quiz extends YTNode {
  static type = 'Quiz';

  choices: {
    text: Text;
    is_correct: boolean;
  }[];

  total_votes: Text;

  constructor(data: RawNode) {
    super();

    this.choices = data.choices.map((choice: RawNode) => ({
      text: new Text(choice.text),
      is_correct: choice.isCorrect
    }));

    this.total_votes = new Text(data.totalVotes);
  }
}