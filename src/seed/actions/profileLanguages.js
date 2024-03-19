/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProfileLanguages extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "profile.*",
      ];

    super(
      "PROFILE_LANGUAGES",
      "profile_languages",
      (state) => state.profileLanguages,
      fetch
    );
  }

  getProfileLanguageList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProfileLanguageDetails(profileLanguageId, callback) {
    return this.getDetails("", profileLanguageId, callback);
  }

  saveProfileLanguage(profileLanguage, callback) {
    return this.postData("", profileLanguage, callback);
  }

  setProfileLanguage(profileLanguageId, profileLanguage, callback) {
    return this.putData("", profileLanguageId, profileLanguage, callback);
  }

  deleteProfileLanguage(profileLanguageId, callback) {
    return this.deleteData("", profileLanguageId, callback);
  }
}

export default _ProfileLanguages;