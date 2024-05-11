import Button from '../Button';
import type { RawNode } from '../../index';

export default class MenuServiceItem extends Button {
  static type = 'MenuServiceItem';

  constructor(data: RawNode) {
    super(data);
  }
}