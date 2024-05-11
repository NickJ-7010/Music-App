import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';
import { Parser } from '../../index';
import NavigationEndpoint from '../NavigationEndpoint';
import SectionList from '../SectionList';

export default class AnchoredSection extends YTNode {
  static type = 'AnchoredSection';

  title: string;
  content: SectionList | null;
  endpoint: NavigationEndpoint;
  category_assets: {
    asset_key: string;
    background_color: string;
  };
  category_type: string;

  constructor(data: RawNode) {
    super();
    this.title = data.title;
    this.content = Parser.parseItem(data.content, SectionList);
    this.endpoint = new NavigationEndpoint(data.navigationEndpoint);

    this.category_assets = {
      asset_key: data.categoryAssets?.assetKey,
      background_color: data.categoryAssets?.backgroundColor
    };

    this.category_type = data.categoryType;
  }
}