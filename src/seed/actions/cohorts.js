/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Cohorts extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "admin.*",
        "mentors.*",
        "instructors.*",
      ];

    super(
      "COHORTS",
      "cohorts",
      (state) => state.cohorts,
      fetch
    );
  }

  getCohortList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getCohortDetails(cohortId, callback) {
    return this.getDetails("", cohortId, callback);
  }

  saveCohort(cohort, callback) {
    return this.postData("", cohort, callback);
  }

  setCohort(cohortId, cohort, callback) {
    return this.putData("", cohortId, cohort, callback);
  }

  deleteCohort(cohortId, callback) {
    return this.deleteData("", cohortId, callback);
  }
}

export default _Cohorts;