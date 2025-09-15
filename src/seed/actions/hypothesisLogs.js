/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _HypothesisLogs extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "ref.*",
      ];

    super(
      "HYPOTHESIS_LOGS",
      "hypothesis_logs",
      (state) => state.hypothesisLogs,
      fetch
    );
  }

  getHypothesisLogList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getHypothesisLogDetails(hypothesisLogId, callback) {
    return this.getDetails("", hypothesisLogId, callback);
  }

  saveHypothesisLog(hypothesisLog, callback) {
    return this.postData("", hypothesisLog, callback);
  }

  setHypothesisLog(hypothesisLogId, hypothesisLog, callback) {
    return this.putData("", hypothesisLogId, hypothesisLog, callback);
  }

  deleteHypothesisLog(hypothesisLogId, callback) {
    return this.deleteData("", hypothesisLogId, callback);
  }
}

export default _HypothesisLogs;