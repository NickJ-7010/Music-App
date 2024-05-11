import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import NavigationEndpoint from './NavigationEndpoint';
import PlaylistCustomThumbnail from './PlaylistCustomThumbnail';
import PlaylistVideoThumbnail from './PlaylistVideoThumbnail';
import Author from './misc/Author';
import Text from './misc/Text';
import Thumbnail from './misc/Thumbnail';

export default class Playlist extends YTNode {
  static type = 'Playlist';

  id: string;
  title: Text;
  author: Text | Author;
  thumbnails: Thumbnail[];
  thumbnail_renderer?: PlaylistVideoThumbnail | PlaylistCustomThumbnail;
  video_count: Text;
  video_count_short: Text;
  first_videos: ObservedArray<YTNode>;
  share_url: string | null;
  menu: YTNode;
  badges: ObservedArray<YTNode>;
  endpoint: NavigationEndpoint;
  thumbnail_overlays;
  view_playlist?: Text;

  constructor(data: RawNode) {
    super();
    this.id = data.playlistId;
    this.title = new Text(data.title);

    this.author = data.shortBylineText?.simpleText ?
      new Text(data.shortBylineText) :
      new Author(data.longBylineText, data.ownerBadges, null);

    this.thumbnails = Thumbnail.fromResponse(data.thumbnail || { thumbnails: data.thumbnails.map((th: any) => th.thumbnails).flat(1) });
    this.video_count = new Text(data.thumbnailText);
    this.video_count_short = new Text(data.videoCountShortText);
    this.first_videos = Parser.parseArray(data.videos);
    this.share_url = data.shareUrl || null;
    this.menu = Parser.parseItem(data.menu);
    this.badges = Parser.parseArray(data.ownerBadges);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
    this.thumbnail_overlays = Parser.parseArray(data.thumbnailOverlays);

    if (Reflect.has(data, 'thumbnailRenderer')) {
      this.thumbnail_renderer = Parser.parseItem(data.thumbnailRenderer, [ PlaylistVideoThumbnail, PlaylistCustomThumbnail ]) || undefined;
    }

    if (Reflect.has(data, 'viewPlaylistText')) {
      this.view_playlist = new Text(data.viewPlaylistText);
    }
  }
}