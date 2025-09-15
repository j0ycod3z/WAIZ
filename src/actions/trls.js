/*
__Seed builder__v0.2.0
  Extended module
*/

import _Trls from 'seed/actions/trls';

class Trls extends _Trls 
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*",
      "l_description.translations.*",
    ]
    super(fetch)
  }
}

export default Trls;