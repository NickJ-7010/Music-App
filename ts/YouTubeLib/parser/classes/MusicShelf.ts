import { YTNode, type ObservedArray } from '../helpers';
import { Parser, type RawNode } from '../index';
import Button from './Button';
import MusicResponsiveListItem from './MusicResponsiveListItem';
import NavigationEndpoint from './NavigationEndpoint';
import Text from './misc/Text';

export default class MusicShelf extends YTNode {
  static type = 'MusicShelf';

  title: Text;
  contents: ObservedArray<MusicResponsiveListItem>;
  endpoint?: NavigationEndpoint;
  continuation?: string;
  bottom_text?: Text;
  bottom_button?: Button | null;
  subheaders?: ObservedArray<YTNode>;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.contents = Parser.parseArray(data.contents, MusicResponsiveListItem);

    if (Reflect.has(data, 'bottomEndpoint')) {
      this.endpoint = new NavigationEndpoint(data.bottomEndpoint);
    }

    if (Reflect.has(data, 'continuations')) {
      this.continuation =
        data.continuations?.[0].nextContinuationData?.continuation ||
        data.continuations?.[0].reloadContinuationData?.continuation;
    }

    if (Reflect.has(data, 'bottomText')) {
      this.bottom_text = new Text(data.bottomText);
    }

    if (Reflect.has(data, 'bottomButton')) {
      this.bottom_button = Parser.parseItem(data.bottomButton, Button);
    }

    if (Reflect.has(data, 'subheaders')) {
      this.subheaders = Parser.parseArray(data.subheaders);
    }
  }
}