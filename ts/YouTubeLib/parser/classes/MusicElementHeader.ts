import { Parser, type RawNode } from '../index';
import Element from './Element';
import { YTNode } from '../helpers';

export default class MusicElementHeader extends YTNode {
  static type = 'MusicElementHeader';

  element: Element | null;

  constructor(data: RawNode) {
    super();
    this.element = Reflect.has(data, 'elementRenderer') ? Parser.parseItem(data, Element) : null;
  }
}