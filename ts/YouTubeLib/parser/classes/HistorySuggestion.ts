import type { RawNode } from '../index';
import SearchSuggestion from './SearchSuggestion';

export default class HistorySuggestion extends SearchSuggestion {
  static type = 'HistorySuggestion';

  constructor(data: RawNode) {
    super(data);
  }
}