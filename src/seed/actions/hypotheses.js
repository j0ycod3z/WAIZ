/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Hypotheses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "area.*",
        "blank_area.*",
        "canvas.*",
        "creator.*",
        "tags.*",
        "customers.*",
      ];

    super(
      "HYPOTHESES",
      "hypotheses",
      (state) => state.hypotheses,
      fetch
    );
  }

  getHypothesisList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getHypothesisDetails(hypothesisId, callback) {
    return this.getDetails("", hypothesisId, callback);
  }

  saveHypothesis(hypothesis, callback) {
    return this.postData("", hypothesis, callback);
  }

  setHypothesis(hypothesisId, hypothesis, callback) {
    return this.putData("", hypothesisId, hypothesis, callback);
  }

  deleteHypothesis(hypothesisId, callback) {
    return this.deleteData("", hypothesisId, callback);
  }
}

export default _Hypotheses;