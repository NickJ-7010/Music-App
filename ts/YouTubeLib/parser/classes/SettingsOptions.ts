import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import ChannelOptions from './ChannelOptions';
import CopyLink from './CopyLink';
import Dropdown from './Dropdown';
import SettingsCheckbox from './SettingsCheckbox';
import SettingsSwitch from './SettingsSwitch';
import Text from './misc/Text';

export default class SettingsOptions extends YTNode {
  static type = 'SettingsOptions';

  title: Text;
  text?: string;
  options?: ObservedArray<SettingsSwitch | Dropdown | CopyLink | SettingsCheckbox | ChannelOptions>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);

    if (Reflect.has(data, 'text')) {
      this.text = new Text(data.text).toString();
    }

    if (Reflect.has(data, 'options')) {
      this.options = Parser.parseArray(data.options, [
        SettingsSwitch, Dropdown, CopyLink,
        SettingsCheckbox, ChannelOptions
      ]);
    }
  }
}