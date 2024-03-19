/*
__Seed builder__v0.2.0
  Extended module
*/

import _Profiles from 'seed/actions/profiles';

class Profiles extends _Profiles
{
  constructor()
  {
    const fetch = [
      "user.*",
      "educations.university.*",
      "laborals.*",
      "languages.*",
      "primary_skills.*",
      "secondary_skills.*",
    ];
    super(fetch)
  }
}



export default Profiles;
