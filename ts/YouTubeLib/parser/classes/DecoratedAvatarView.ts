import { YTNode } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import AvatarView from './AvatarView';

export default class DecoratedAvatarView extends YTNode {
  static type = 'DecoratedAvatarView';

  avatar: AvatarView | null;
  a11y_label: string;
  on_tap_endpoint?: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.avatar = Parser.parseItem(data.avatar, AvatarView);
    this.a11y_label = data.a11yLabel;
    if (data.rendererContext?.commandContext?.onTap) {
      this.on_tap_endpoint = new NavigationEndpoint(data.rendererContext.commandContext.onTap);
    }
  }
}