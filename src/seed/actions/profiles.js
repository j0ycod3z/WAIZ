/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Profiles extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "user.*",
        "educations.*",
        "laborals.*",
        "languages.*",
        "primary_skills.*",
        "secondary_skills.*",
      ];

    super(
      "PROFILES",
      "profiles",
      (state) => state.profiles,
      fetch
    );
  }

  getProfileList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProfileDetails(profileId, callback) {
    return this.getDetails("", profileId, callback);
  }

  saveProfile(profile, callback) {
    return this.postData("", profile, callback);
  }

  setProfile(profileId, profile, callback) {
    return this.putData("", profileId, profile, callback);
  }

  deleteProfile(profileId, callback) {
    return this.deleteData("", profileId, callback);
  }
}

export default _Profiles;