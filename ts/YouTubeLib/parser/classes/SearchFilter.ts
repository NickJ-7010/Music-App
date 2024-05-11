import { YTNode } from '../helpers';
import type { RawNode } from '../index';
import Text from './misc/Text';
import NavigationEndpoint from './NavigationEndpoint';

export default class SearchFilter extends YTNode {
  static type = 'SearchFilter';

  label: Text;
  endpoint: NavigationEndpoint;
  tooltip: string;
  status?: string;

  constructor(data: RawNode) {
    super();
    this.label = new Text(data.label);
    this.endpoint = new NavigationEndpoint(data.endpoint || data.navigationEndpoint);
    this.tooltip = data.tooltip;

    if (Reflect.has(data, 'status')) {
      this.status = data.status;
    }
  }

  get disabled(): boolean {
    return this.status === 'FILTER_STATUS_DISABLED';
  }

  get selected(): boolean {
    return this.status === 'FILTER_STATUS_SELECTED';
  }
}