/*
__Seed builder__v0.2.0
  Extended module
*/

import _AreaHelps from 'seed/actions/areaHelps';

class AreaHelps extends _AreaHelps 
{
  constructor()
  {
    const fetch = [
      "l_content.translations.*",
      "l_video_id.translations.*"
    ]
    super(fetch)
  }
}

export default AreaHelps;