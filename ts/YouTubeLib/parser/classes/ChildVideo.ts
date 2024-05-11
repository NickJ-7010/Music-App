import { timeToSeconds } from '../../utils/Utils';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class ChildVideo extends YTNode {
  static type = 'ChildVideo';

  id: string;
  title: Text;

  duration: {
    text: string;
    seconds: number;
  };

  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.id = data.videoId;
    this.title = new Text(data.title);
    this.duration = {
      text: data.lengthText.simpleText,
      seconds: timeToSeconds(data.lengthText.simpleText)
    };
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
  }
}