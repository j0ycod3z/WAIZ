/*
__Seed builder__v0.2.0
  Extended module
*/

import _KbSections from 'seed/actions/kbSections';

class KbSections extends _KbSections 
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*",
      "l_description.translations.*",
      "items.l_title.translations.*",
    ]
    super(fetch)
  }
}

export default KbSections;