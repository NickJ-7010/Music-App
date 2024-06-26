import Text from '../misc/Text';
import NavigationEndpoint from '../NavigationEndpoint';
import { YTNode } from '../../helpers';
import type { RawNode } from '../../index';

export default class KidsCategoryTab extends YTNode {
  static type = 'KidsCategoryTab';

  title: Text;
  category_assets: {
    asset_key: string;
    background_color: string;
  };
  category_type: string;
  endpoint: NavigationEndpoint;

  constructor(data: RawNode) {
    super();
    this.title = new Text(data.title);
    this.category_assets = {
      asset_key: data.categoryAssets?.assetKey,
      background_color: data.categoryAssets?.backgroundColor
    };
    this.category_type = data.categoryType;
    this.endpoint = new NavigationEndpoint(data.endpoint);
  }
}