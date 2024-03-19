/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Frontiers extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
      ];

    super(
      "FRONTIERS",
      "frontiers",
      (state) => state.frontiers,
      fetch
    );
  }

  getFrontierList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getFrontierDetails(frontierId, callback) {
    return this.getDetails("", frontierId, callback);
  }

  saveFrontier(frontier, callback) {
    return this.postData("", frontier, callback);
  }

  setFrontier(frontierId, frontier, callback) {
    return this.putData("", frontierId, frontier, callback);
  }

  deleteFrontier(frontierId, callback) {
    return this.deleteData("", frontierId, callback);
  }
}

export default _Frontiers;