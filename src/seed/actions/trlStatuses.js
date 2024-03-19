/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _TrlStatuses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "question.*",
      ];

    super(
      "TRL_STATUSES",
      "trl_statuses",
      (state) => state.trlStatuses,
      fetch
    );
  }

  getTrlStatusList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getTrlStatusDetails(trlStatusId, callback) {
    return this.getDetails("", trlStatusId, callback);
  }

  saveTrlStatus(trlStatus, callback) {
    return this.postData("", trlStatus, callback);
  }

  setTrlStatus(trlStatusId, trlStatus, callback) {
    return this.putData("", trlStatusId, trlStatus, callback);
  }

  deleteTrlStatus(trlStatusId, callback) {
    return this.deleteData("", trlStatusId, callback);
  }
}

export default _TrlStatuses;