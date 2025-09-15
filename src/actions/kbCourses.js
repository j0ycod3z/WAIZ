/*
__Seed builder__v0.2.0
  Extended module
*/

import _KbCourses from 'seed/actions/kbCourses';

class KbCourses extends _KbCourses 
{
  constructor()
  {
    const fetch = [
      "l_name.translations.*",
      "sections.*",
    ]
    super(fetch)
  }
}

export default KbCourses;