/*
__Seed builder__v0.2.0
  Extended module
*/

import _Hypotheses from 'seed/actions/hypotheses';

class Hypotheses extends _Hypotheses 
{
  constructor()
  {
    const fetch = [
      "area.*",
      "creator.*",
      "tags.l_name.translations.*",
      "customers.*",
    ]
    super(fetch)
  }
}

export default Hypotheses;