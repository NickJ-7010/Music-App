import Button from '../Button';
import type { RawNode } from '../../index';

export default class MenuNavigationItem extends Button {
  static type = 'MenuNavigationItem';

  constructor(data: RawNode) {
    super(data);
  }
}