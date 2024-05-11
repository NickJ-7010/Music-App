import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import { Text } from '../misc';
import MacroMarkersInfoItem from './MacroMarkersInfoItem';
import MacroMarkersListItem from './MacroMarkersListItem';

export default class MacroMarkersList extends YTNode {
  static type = 'MacroMarkersList';

  contents: ObservedArray<MacroMarkersInfoItem | MacroMarkersListItem>;
  sync_button_label: Text;

  constructor(data: RawNode) {
    super();
    this.contents = Parser.parseArray(data.contents, [ MacroMarkersInfoItem, MacroMarkersListItem ]);
    this.sync_button_label = new Text(data.syncButtonLabel);
  }
}