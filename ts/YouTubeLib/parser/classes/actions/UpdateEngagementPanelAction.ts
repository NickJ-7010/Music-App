import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';
import Transcript from '../Transcript';

export default class UpdateEngagementPanelAction extends YTNode {
  static type = 'UpdateEngagementPanelAction';

  target_id: string;
  content: Transcript | null;

  constructor(data: RawNode) {
    super();
    this.target_id = data.targetId;
    this.content = Parser.parseItem(data.content, Transcript);
  }
}