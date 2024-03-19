/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Locales extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "translations.*",
      ];

    super(
      "LOCALES",
      "locales",
      (state) => state.locales,
      fetch
    );
  }

  getLocaleList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getLocaleDetails(localeId, callback) {
    return this.getDetails("", localeId, callback);
  }

  saveLocale(locale, callback) {
    return this.postData("", locale, callback);
  }

  setLocale(localeId, locale, callback) {
    return this.putData("", localeId, locale, callback);
  }

  deleteLocale(localeId, callback) {
    return this.deleteData("", localeId, callback);
  }
}

export default _Locales;