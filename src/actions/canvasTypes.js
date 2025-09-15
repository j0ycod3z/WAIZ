/*
__Seed builder__v0.2.0
  Extended module
*/

import _CanvasTypes from 'seed/actions/canvasTypes';

class CanvasTypes extends _CanvasTypes {

  constructor()
  {
    const fetch = [
      "areas.tags.l_name.translations.*",
      "areas.l_name.translations.*",
      "l_name.translations.*",
      "l_legend.translations.*"
    ]
    super(fetch)
  }
}

export default CanvasTypes;
