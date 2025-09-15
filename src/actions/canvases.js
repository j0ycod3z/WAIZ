/*
__Seed builder__v0.2.0
  Extended module
*/

import _Canvases from 'seed/actions/canvases';

class Canvases extends _Canvases 
{
  constructor()
  {
    const fetch = [
      "type.areas.tags.l_name.translations.*",
      "type.areas.l_name.translations.*",
      "type.l_name.translations.*",
      "type.l_legend.translations.*"
    ]
    super(fetch)
  }
}

export default Canvases;