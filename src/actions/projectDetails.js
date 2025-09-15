/*
__Seed builder__v0.2.0
  Extended module
*/

import _ProjectDetails from 'seed/actions/projectDetails';

class ProjectDetails extends _ProjectDetails 
{
  constructor()
  {
    const fetch = [
      "project.*",
      "features.*",
    ]
    super(fetch)
  }
}

export default ProjectDetails;