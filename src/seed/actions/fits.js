/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Fits extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
      ];

    super(
      "FITS",
      "fits",
      (state) => state.fits,
      fetch
    );
  }

  getFitList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getFitDetails(fitId, callback) {
    return this.getDetails("", fitId, callback);
  }

  saveFit(fit, callback) {
    return this.postData("", fit, callback);
  }

  setFit(fitId, fit, callback) {
    return this.putData("", fitId, fit, callback);
  }

  deleteFit(fitId, callback) {
    return this.deleteData("", fitId, callback);
  }
}

export default _Fits;