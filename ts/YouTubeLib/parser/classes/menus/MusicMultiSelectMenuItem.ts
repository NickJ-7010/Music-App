import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import NavigationEndpoint from '../NavigationEndpoint';
import Text from '../misc/Text';

export default class MusicMultiSelectMenuItem extends YTNode {
  static type = 'MusicMultiSelectMenuItem';

  title: string;
  form_item_entity_key: string;
  selected_icon_type?: string;
  endpoint?: NavigationEndpoint;
  selected: boolean;

  constructor(data: RawNode) {
    super();

    this.title = new Text(data.title).toString();
    this.form_item_entity_key = data.formItemEntityKey;

    if (Reflect.has(data, 'selectedIcon')) {
      this.selected_icon_type = data.selectedIcon.iconType;
    }

    // @TODO: Check if there any other endpoints we can parse.
    if (Reflect.has(data, 'selectedCommand')) {
      this.endpoint = new NavigationEndpoint(data.selectedCommand);
    }

    this.selected = !!this.endpoint;
  }
}