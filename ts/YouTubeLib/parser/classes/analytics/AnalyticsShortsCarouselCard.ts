import NavigationEndpoint from '../NavigationEndpoint';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class AnalyticsShortsCarouselCard extends YTNode {
  static type = 'AnalyticsShortsCarouselCard';

  title: string;
  shorts: {
    description: string;
    thumbnail_url: string;
    endpoint: NavigationEndpoint;
  }[];

  constructor(data: RawNode) {
    super();
    this.title = data.title;
    this.shorts = data.shortsCarouselData.shorts.map((short: any) => ({
      description: short.shortsDescription,
      thumbnail_url: short.thumbnailUrl,
      endpoint: new NavigationEndpoint(short.videoEndpoint)
    }));
  }
}