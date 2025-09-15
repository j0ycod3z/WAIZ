/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _DevStages extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
      ];

    super(
      "DEV_STAGES",
      "dev_stages",
      (state) => state.devStages,
      fetch
    );
  }

  getDevStageList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getDevStageDetails(devStageId, callback) {
    return this.getDetails("", devStageId, callback);
  }

  saveDevStage(devStage, callback) {
    return this.postData("", devStage, callback);
  }

  setDevStage(devStageId, devStage, callback) {
    return this.putData("", devStageId, devStage, callback);
  }

  deleteDevStage(devStageId, callback) {
    return this.deleteData("", devStageId, callback);
  }
}

export default _DevStages;