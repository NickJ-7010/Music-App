import { YTNode } from '../helpers';
import Thumbnail from './misc/Thumbnail';
import Button from './Button';
import ClipCreationTextInput from './ClipCreationTextInput';
import ClipCreationScrubber from './ClipCreationScrubber';
import ClipAdState from './ClipAdState';
import Text from './misc/Text';

import { Parser } from '../index';

import type { RawNode } from '../types/index';

export default class ClipCreation extends YTNode {
  static type = 'ClipCreation';

  user_avatar: Thumbnail[];
  title_input: ClipCreationTextInput | null;
  scrubber: ClipCreationScrubber | null;
  save_button: Button | null;
  display_name: Text;
  publicity_label: string;
  cancel_button: Button | null;
  ad_state_overlay: ClipAdState | null;
  external_video_id: string;
  publicity_label_icon: string;

  constructor(data: RawNode) {
    super();
    this.user_avatar = Thumbnail.fromResponse(data.userAvatar);
    this.title_input = Parser.parseItem(data.titleInput, [ ClipCreationTextInput ]);
    this.scrubber = Parser.parseItem(data.scrubber, [ ClipCreationScrubber ]);
    this.save_button = Parser.parseItem(data.saveButton, [ Button ]);
    this.display_name = new Text(data.displayName);
    this.publicity_label = data.publicityLabel;
    this.cancel_button = Parser.parseItem(data.cancelButton, [ Button ]);
    this.ad_state_overlay = Parser.parseItem(data.adStateOverlay, [ ClipAdState ]);
    this.external_video_id = data.externalVideoId;
    this.publicity_label_icon = data.publicityLabelIcon;
  }
}