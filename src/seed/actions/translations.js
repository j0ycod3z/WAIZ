/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Translations extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "locale.*",
      ];

    super(
      "TRANSLATIONS",
      "translations",
      (state) => state.translations,
      fetch
    );
  }

  getTranslationList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getTranslationDetails(translationId, callback) {
    return this.getDetails("", translationId, callback);
  }

  saveTranslation(translation, callback) {
    return this.postData("", translation, callback);
  }

  setTranslation(translationId, translation, callback) {
    return this.putData("", translationId, translation, callback);
  }

  deleteTranslation(translationId, callback) {
    return this.deleteData("", translationId, callback);
  }
}

export default _Translations;