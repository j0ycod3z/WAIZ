/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _FitStatuses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "fit.*",
      ];

    super(
      "FIT_STATUSES",
      "fit_statuses",
      (state) => state.fitStatuses,
      fetch
    );
  }

  getFitStatusList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getFitStatusDetails(fitStatusId, callback) {
    return this.getDetails("", fitStatusId, callback);
  }

  saveFitStatus(fitStatus, callback) {
    return this.postData("", fitStatus, callback);
  }

  setFitStatus(fitStatusId, fitStatus, callback) {
    return this.putData("", fitStatusId, fitStatus, callback);
  }

  deleteFitStatus(fitStatusId, callback) {
    return this.deleteData("", fitStatusId, callback);
  }
}

export default _FitStatuses;