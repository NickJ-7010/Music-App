import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import EndScreenPlaylist from './EndScreenPlaylist';
import EndScreenVideo from './EndScreenVideo';
import Text from './misc/Text';

export default class WatchNextEndScreen extends YTNode {
  static type = 'WatchNextEndScreen';

  results: ObservedArray<EndScreenVideo | EndScreenPlaylist>;
  title: string;

  constructor(data: RawNode) {
    super();
    this.results = Parser.parseArray(data.results, [ EndScreenVideo, EndScreenPlaylist ]);
    this.title = new Text(data.title).toString();
  }
}