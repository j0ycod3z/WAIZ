/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _FrontierStatuses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "frontier.*",
      ];

    super(
      "FRONTIER_STATUSES",
      "frontier_statuses",
      (state) => state.frontierStatuses,
      fetch
    );
  }

  getFrontierStatusList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getFrontierStatusDetails(frontierStatusId, callback) {
    return this.getDetails("", frontierStatusId, callback);
  }

  saveFrontierStatus(frontierStatus, callback) {
    return this.postData("", frontierStatus, callback);
  }

  setFrontierStatus(frontierStatusId, frontierStatus, callback) {
    return this.putData("", frontierStatusId, frontierStatus, callback);
  }

  deleteFrontierStatus(frontierStatusId, callback) {
    return this.deleteData("", frontierStatusId, callback);
  }
}

export default _FrontierStatuses;