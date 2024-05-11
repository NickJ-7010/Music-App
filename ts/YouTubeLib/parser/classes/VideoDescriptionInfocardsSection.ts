import { Parser, type RawNode } from '../index';

import { YTNode } from '../helpers';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';
import Button from './Button';
import NavigationEndpoint from './NavigationEndpoint';

export default class VideoDescriptionInfocardsSection extends YTNode {
  static type = 'VideoDescriptionInfocardsSection';

  section_title: Text;
  creator_videos_button: Button | null;
  creator_about_button: Button | null;
  section_subtitle: Text;
  channel_avatar: Thumbnail[];
  channel_endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.section_title = new Text(data.sectionTitle);
    this.creator_videos_button = Parser.parseItem(data.creatorVideosButton, Button);
    this.creator_about_button = Parser.parseItem(data.creatorAboutButton, Button);
    this.section_subtitle = new Text(data.sectionSubtitle);
    this.channel_avatar = Thumbnail.fromResponse(data.channelAvatar);
    this.channel_endpoint = new NavigationEndpoint(data.channelEndpoint);
  }
}