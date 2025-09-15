/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _CanvasTypes extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
        "l_legend.*",
        "areas.*",
      ];

    super(
      "CANVAS_TYPES",
      "canvas_types",
      (state) => state.canvasTypes,
      fetch
    );
  }

  getCanvasTypeList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getCanvasTypeDetails(canvasTypeId, callback) {
    return this.getDetails("", canvasTypeId, callback);
  }

  saveCanvasType(canvasType, callback) {
    return this.postData("", canvasType, callback);
  }

  setCanvasType(canvasTypeId, canvasType, callback) {
    return this.putData("", canvasTypeId, canvasType, callback);
  }

  deleteCanvasType(canvasTypeId, callback) {
    return this.deleteData("", canvasTypeId, callback);
  }
}

export default _CanvasTypes;