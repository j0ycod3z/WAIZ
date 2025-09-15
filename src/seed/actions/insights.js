/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Insights extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "hypothesis.*",
        "area.*",
        "interview.*",
        "project.*",
        "creator.*",
      ];

    super(
      "INSIGHTS",
      "insights",
      (state) => state.insights,
      fetch
    );
  }

  getInsightList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getInsightDetails(insightId, callback) {
    return this.getDetails("", insightId, callback);
  }

  saveInsight(insight, callback) {
    return this.postData("", insight, callback);
  }

  setInsight(insightId, insight, callback) {
    return this.putData("", insightId, insight, callback);
  }

  deleteInsight(insightId, callback) {
    return this.deleteData("", insightId, callback);
  }
}

export default _Insights;