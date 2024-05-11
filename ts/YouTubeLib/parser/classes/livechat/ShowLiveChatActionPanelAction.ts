import { Parser } from '../../index';
import LiveChatActionPanel from './LiveChatActionPanel';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class ShowLiveChatActionPanelAction extends YTNode {
  static type = 'ShowLiveChatActionPanelAction';

  panel_to_show: LiveChatActionPanel | null;

  constructor(data: RawNode) {
    super();
    this.panel_to_show = Parser.parseItem(data.panelToShow, LiveChatActionPanel);
  }
}