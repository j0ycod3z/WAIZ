/*
__Seed builder__v0.2.0
  Extended module
*/

import _DeepQuestions from 'seed/actions/deepQuestions';

class DeepQuestions extends _DeepQuestions 
{
  constructor()
  {
    const fetch = [
      "l_content.translations.*"
    ]
    super(fetch)
  }
}

export default DeepQuestions;