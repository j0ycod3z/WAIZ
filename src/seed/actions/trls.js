/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Trls extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
        "l_description.*",
      ];

    super(
      "TRLS",
      "trls",
      (state) => state.trls,
      fetch
    );
  }

  getTrlList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getTrlDetails(trlId, callback) {
    return this.getDetails("", trlId, callback);
  }

  saveTrl(trl, callback) {
    return this.postData("", trl, callback);
  }

  setTrl(trlId, trl, callback) {
    return this.putData("", trlId, trl, callback);
  }

  deleteTrl(trlId, callback) {
    return this.deleteData("", trlId, callback);
  }
}

export default _Trls;