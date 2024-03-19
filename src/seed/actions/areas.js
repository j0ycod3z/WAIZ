/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Areas extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
        "canvas_type.*",
        "tags.*",
      ];

    super(
      "AREAS",
      "areas",
      (state) => state.areas,
      fetch
    );
  }

  getAreaList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getAreaDetails(areaId, callback) {
    return this.getDetails("", areaId, callback);
  }

  saveArea(area, callback) {
    return this.postData("", area, callback);
  }

  setArea(areaId, area, callback) {
    return this.putData("", areaId, area, callback);
  }

  deleteArea(areaId, callback) {
    return this.deleteData("", areaId, callback);
  }
}

export default _Areas;