/*
__Seed builder__v0.2.0
  Extended module
*/

import _Projects from 'seed/actions/projects';

class Projects extends _Projects 
{
  constructor()
  {
    const fetch = [
      "canvas_type2.*",
      "cohort.*",
      "admin.*",
      "members.*",
      "mentors.*",
      "canvas.type.l_name.translations.*",
    ]
    super(fetch)
  }

  getUserProjectList(userId, cohortId, callback) 
  {
    let query = `user_id=${userId}&cohort_id=${cohortId}`;
    return this.request(
      "GET", `/get_list`, query, {},
      callback, this.onGetList);
  }

  setType2(projectId, typeId, callback) 
  {
    let body = {
      type_id: typeId
    };

    return this.putData(
      '/set_type2', projectId, body, callback
    );
  }

  registerProject(userId, name, description, cohortId, callback) 
  {
    let body = {
      user_id: userId,
      name: name,
      description: description
    };
    if (cohortId)
      body.cohort_id = cohortId;

    return this.postData(
      '/registry', body, callback
    );
  }

  inviteProject(userId, projectId, members, mentors, callback) 
  {
    let body = {
      user_id: userId,
      project_id: projectId,
      members: members,
      mentors: mentors
    };

    return this.postData(
      '/invite', body, callback
    );
  }
}

export default Projects;