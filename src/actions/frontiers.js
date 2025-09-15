/*
__Seed builder__v0.2.0
  Extended module
*/

import _Frontiers from 'seed/actions/frontiers';

class Frontiers extends _Frontiers
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*"
    ]
    super(fetch)
  }
}

export default Frontiers;
