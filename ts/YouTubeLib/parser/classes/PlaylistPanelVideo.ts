import { timeToSeconds } from '../../utils/Utils';
import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';
import type TextRun from './misc/TextRun';
import Thumbnail from './misc/Thumbnail';

export default class PlaylistPanelVideo extends YTNode {
  static type = 'PlaylistPanelVideo';

  title: Text;
  thumbnail: Thumbnail[];
  endpoint: NavigationEndpoint;
  selected: boolean;
  video_id: string;

  duration: {
    text: string;
    seconds: number
  };

  author: string;

  album?: {
    id?: string;
    name: string;
    year?: string;
    endpoint?: NavigationEndpoint;
  };

  artists?: {
    name: string;
    channel_id?: string;
    endpoint?: NavigationEndpoint;
  }[];

  badges: ObservedArray<YTNode>;
  menu: YTNode;
  set_video_id?: string;

  constructor(data: RawNode) {
    super();

    this.title = new Text(data.title);
    this.thumbnail = Thumbnail.fromResponse(data.thumbnail);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.selected = data.selected;
    this.video_id = data.videoId;

    this.duration = {
      text: new Text(data.lengthText).toString(),
      seconds: timeToSeconds(new Text(data.lengthText).toString())
    };

    const album = new Text(data.longBylineText).runs?.find((run: any) => run.endpoint?.payload?.browseId?.startsWith('MPR'));
    const artists = new Text(data.longBylineText).runs?.filter((run: any) => run.endpoint?.payload?.browseId?.startsWith('UC'));

    this.author = new Text(data.shortBylineText).toString();

    if (album) {
      this.album = {
        id: (album as TextRun).endpoint?.payload?.browseId,
        name: (album as TextRun).text,
        year: new Text(data.longBylineText).runs?.slice(-1)[0].text,
        endpoint: (album as TextRun).endpoint
      };
    }

    if (artists) {
      this.artists = artists.map((artist) => ({
        name: (artist as TextRun).text,
        channel_id: (artist as TextRun).endpoint?.payload?.browseId,
        endpoint: (artist as TextRun).endpoint
      }));
    }

    this.badges = Parser.parseArray(data.badges);
    this.menu = Parser.parseItem(data.menu);
    this.set_video_id = data.playlistSetVideoId;
  }
}