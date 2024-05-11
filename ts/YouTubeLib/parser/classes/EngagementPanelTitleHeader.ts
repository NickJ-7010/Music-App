import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import Text from './misc/Text';
import Button from './Button';

export default class EngagementPanelTitleHeader extends YTNode {
  static type = 'EngagementPanelTitleHeader';

  title: Text;
  visibility_button: Button | null;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.visibility_button = Parser.parseItem(data.visibilityButton, Button);
  }
}