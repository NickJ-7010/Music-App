import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import NavigationEndpoint from '../NavigationEndpoint';

export default class MenuServiceItemDownload extends YTNode {
  static type = 'MenuServiceItemDownload';

  has_separator: boolean;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.has_separator = !!data.hasSeparator;
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint || data.serviceEndpoint);
  }
}