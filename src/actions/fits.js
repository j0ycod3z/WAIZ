/*
__Seed builder__v0.2.0
  Extended module
*/

import _Fits from 'seed/actions/fits';

class Fits extends _Fits
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*"
    ]
    super(fetch)
  }
}

export default Fits;
