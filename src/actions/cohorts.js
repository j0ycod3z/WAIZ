/*
__Seed builder__v0.2.0
  Extended module
*/

import _Cohorts from "seed/actions/cohorts";

class Cohorts extends _Cohorts
{
  getUserCohortList(userId, callback) 
  {
    let query = `user_id=${userId}`;
    return this.request(
      "GET", `/get_list`, query, {},
      callback, this.onGetList);
  }

  inviteCohort(userId, cohortId, mentors, instructors, callback) 
  {
    let body = {
      user_id: userId,
      cohort_id: cohortId,
      mentors: mentors,
      instructors: instructors
    };

    return this.postData(
      '/invite', body, callback
    );
  }

  bulkLoad(userId, cohortId, projects, callback) 
  {
    let body = {
      user_id: userId,
      cohort_id: cohortId,
      projects: projects
    };
    return this.postData(
      '/bulk', body, callback
    );
  }
}

export default Cohorts;
