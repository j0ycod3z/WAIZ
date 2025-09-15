/*
__Seed builder__v0.2.0
  Extended module
*/

import _TrlQuestions from 'seed/actions/trlQuestions';

class TrlQuestions extends _TrlQuestions 
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*"
    ]
    super(fetch)
  }
}

export default TrlQuestions;