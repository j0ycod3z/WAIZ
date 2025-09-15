/*
__Seed builder__v0.2.0
  Extended module
*/

import _KbItems from 'seed/actions/kbItems';

class KbItems extends _KbItems 
{
  constructor()
  {
    const fetch = [
      "l_text.translations.*",
      "l_title.translations.*",
      "files.*"
    ]
    super(fetch)
  }
}

export default KbItems;