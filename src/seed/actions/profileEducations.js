/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProfileEducations extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "university.*",
        "profile.*",
      ];

    super(
      "PROFILE_EDUCATIONS",
      "profile_educations",
      (state) => state.profileEducations,
      fetch
    );
  }

  getProfileEducationList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProfileEducationDetails(profileEducationId, callback) {
    return this.getDetails("", profileEducationId, callback);
  }

  saveProfileEducation(profileEducation, callback) {
    return this.postData("", profileEducation, callback);
  }

  setProfileEducation(profileEducationId, profileEducation, callback) {
    return this.putData("", profileEducationId, profileEducation, callback);
  }

  deleteProfileEducation(profileEducationId, callback) {
    return this.deleteData("", profileEducationId, callback);
  }
}

export default _ProfileEducations;