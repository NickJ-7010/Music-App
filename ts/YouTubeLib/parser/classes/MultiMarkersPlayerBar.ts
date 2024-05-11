import { YTNode, observe, type ObservedArray } from '../helpers';
import type { RawNode } from '../index';
import { Parser } from '../index';
import Chapter from './Chapter';
import Heatmap from './Heatmap';

export class Marker extends YTNode {
  static type = 'Marker';

  marker_key: string;
  value: {
    heatmap?: Heatmap | null;
    chapters?: Chapter[];
  };

  constructor(data: RawNode) {
    super();
    this.marker_key = data.key;

    this.value = {};

    if (Reflect.has(data, 'value')) {
      if (Reflect.has(data.value, 'heatmap')) {
        this.value.heatmap = Parser.parseItem(data.value.heatmap, Heatmap);
      }

      if (Reflect.has(data.value, 'chapters')) {
        this.value.chapters = Parser.parseArray(data.value.chapters, Chapter);
      }
    }
  }
}

export default class MultiMarkersPlayerBar extends YTNode {
  static type = 'MultiMarkersPlayerBar';

  markers_map: ObservedArray<Marker>;

  constructor(data: RawNode) {
    super();
    this.markers_map = observe(data.markersMap?.map((marker: {
      key: string;
      value: {
        [key: string]: RawNode
      }
    }) => new Marker(marker)) || []);
  }
}