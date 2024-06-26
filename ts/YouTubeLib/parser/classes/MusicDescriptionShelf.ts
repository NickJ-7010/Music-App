import Text from './misc/Text';
import { YTNode } from '../helpers';
import type { RawNode } from '../index';

export default class MusicDescriptionShelf extends YTNode {
  static type = 'MusicDescriptionShelf';

  description: Text;
  max_collapsed_lines?: string;
  max_expanded_lines?: string;
  footer: Text;

  constructor(data: RawNode) {
    super();
    this.description = new Text(data.description);

    if (Reflect.has(data, 'maxCollapsedLines')) {
      this.max_collapsed_lines = data.maxCollapsedLines;
    }

    if (Reflect.has(data, 'maxExpandedLines')) {
      this.max_expanded_lines = data.maxExpandedLines;
    }

    this.footer = new Text(data.footer);
  }
}