/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProfileLaborals extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "profile.*",
      ];

    super(
      "PROFILE_LABORALS",
      "profile_laborals",
      (state) => state.profileLaborals,
      fetch
    );
  }

  getProfileLaboralList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProfileLaboralDetails(profileLaboralId, callback) {
    return this.getDetails("", profileLaboralId, callback);
  }

  saveProfileLaboral(profileLaboral, callback) {
    return this.postData("", profileLaboral, callback);
  }

  setProfileLaboral(profileLaboralId, profileLaboral, callback) {
    return this.putData("", profileLaboralId, profileLaboral, callback);
  }

  deleteProfileLaboral(profileLaboralId, callback) {
    return this.deleteData("", profileLaboralId, callback);
  }
}

export default _ProfileLaborals;