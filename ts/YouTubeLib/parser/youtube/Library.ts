import { InnertubeError } from '../../utils/Utils';
import Feed from '../../core/mixins/Feed';
import History from './History';
import Playlist from './Playlist';
import Menu from '../classes/menus/Menu';
import Shelf from '../classes/Shelf';
import Button from '../classes/Button';
import PageHeader from '../classes/PageHeader';

import type { Actions, ApiResponse } from '../../core/index';
import type { IBrowseResponse } from '../types/index';

class Library extends Feed<IBrowseResponse> {
  header: PageHeader | null;
  sections;

  constructor(actions: Actions, data: ApiResponse | IBrowseResponse) {
    super(actions, data);

    if (!this.page.contents_memo)
      throw new InnertubeError('Page contents not found');

    this.header = this.memo.getType(PageHeader).first();

    const shelves = this.page.contents_memo.getType(Shelf);

    this.sections = shelves.map((shelf: Shelf) => ({
      type: shelf.icon_type,
      title: shelf.title,
      contents: shelf.content?.key('items').array() || [],
      getAll: () => this.#getAll(shelf)
    }));
  }

  async #getAll(shelf: Shelf): Promise<Playlist | History | Feed> {
    if (!shelf.menu?.as(Menu).hasKey('top_level_buttons'))
      throw new InnertubeError(`The ${shelf.title.text} shelf doesn't have more items`);

    const button = shelf.menu.as(Menu).top_level_buttons.firstOfType(Button);

    if (!button)
      throw new InnertubeError('Did not find target button.');

    const page = await button.as(Button).endpoint.call<IBrowseResponse>(this.actions, { parse: true });

    switch (shelf.icon_type) {
      case 'LIKE':
      case 'WATCH_LATER':
        return new Playlist(this.actions, page, true);
      case 'WATCH_HISTORY':
        return new History(this.actions, page, true);
      case 'CONTENT_CUT':
        return new Feed(this.actions, page, true);
      default:
        throw new InnertubeError('Target shelf not implemented.');
    }
  }

  get history() {
    return this.sections.find((section) => section.type === 'WATCH_HISTORY');
  }

  get watch_later() {
    return this.sections.find((section) => section.type === 'WATCH_LATER');
  }

  get liked_videos() {
    return this.sections.find((section) => section.type === 'LIKE');
  }

  get playlists_section() {
    return this.sections.find((section) => section.type === 'PLAYLISTS');
  }

  get clips() {
    return this.sections.find((section) => section.type === 'CONTENT_CUT');
  }
}

export default Library;