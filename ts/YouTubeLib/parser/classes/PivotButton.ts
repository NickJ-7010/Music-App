import { type RawNode } from '../index';
import { YTNode } from '../helpers';
import Thumbnail from './misc/Thumbnail';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class PivotButton extends YTNode {
  static type = 'PivotButton';

  thumbnail: Thumbnail[];
  endpoint: NavigationEndpoint;
  content_description: Text;
  target_id: string;
  sound_attribution_title: Text;
  waveform_animation_style: string;
  background_animation_style: string;

  constructor(data: RawNode) {
    super();
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
    this.endpoint = new NavigationEndpoint(data.onClickCommand);
    this.content_description = new Text(data.contentDescription);
    this.target_id = data.targetId;
    this.sound_attribution_title = new Text(data.soundAttributionTitle);
    this.waveform_animation_style = data.waveformAnimationStyle;
    this.background_animation_style = data.backgroundAnimationStyle;
  }
}