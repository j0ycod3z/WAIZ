/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Universities extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
      ];

    super(
      "UNIVERSITIES",
      "universities",
      (state) => state.universities,
      fetch
    );
  }

  getUniversityList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getUniversityDetails(universityId, callback) {
    return this.getDetails("", universityId, callback);
  }

  saveUniversity(university, callback) {
    return this.postData("", university, callback);
  }

  setUniversity(universityId, university, callback) {
    return this.putData("", universityId, university, callback);
  }

  deleteUniversity(universityId, callback) {
    return this.deleteData("", universityId, callback);
  }
}

export default _Universities;