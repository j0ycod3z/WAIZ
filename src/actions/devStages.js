/*
__Seed builder__v0.2.0
  Extended module
*/

import _DevStages from 'seed/actions/devStages';

class DevStages extends _DevStages
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*"
    ]
    super(fetch)
  }
}

export default DevStages;
