import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class PageIntroduction extends YTNode {
  static type = 'PageIntroduction';

  header_text: string;
  body_text: string;
  page_title: string;
  header_icon_type: string;

  constructor(data: RawNode) {
    super();
    this.header_text = new Text(data.headerText).toString();
    this.body_text = new Text(data.bodyText).toString();
    this.page_title = new Text(data.pageTitle).toString();
    this.header_icon_type = data.headerIcon.iconType;
  }
}