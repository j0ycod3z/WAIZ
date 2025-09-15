/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _DevStageStatuses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "dev_stage.*",
      ];

    super(
      "DEV_STAGE_STATUSES",
      "dev_stage_statuses",
      (state) => state.devStageStatuses,
      fetch
    );
  }

  getDevStageStatusList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getDevStageStatusDetails(devStageStatusId, callback) {
    return this.getDetails("", devStageStatusId, callback);
  }

  saveDevStageStatus(devStageStatus, callback) {
    return this.postData("", devStageStatus, callback);
  }

  setDevStageStatus(devStageStatusId, devStageStatus, callback) {
    return this.putData("", devStageStatusId, devStageStatus, callback);
  }

  deleteDevStageStatus(devStageStatusId, callback) {
    return this.deleteData("", devStageStatusId, callback);
  }
}

export default _DevStageStatuses;