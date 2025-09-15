/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Canvases extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "type.*",
        "project.*",
      ];

    super(
      "CANVASES",
      "canvases",
      (state) => state.canvases,
      fetch
    );
  }

  getCanvasList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getCanvasDetails(canvasId, callback) {
    return this.getDetails("", canvasId, callback);
  }

  saveCanvas(canvas, callback) {
    return this.postData("", canvas, callback);
  }

  setCanvas(canvasId, canvas, callback) {
    return this.putData("", canvasId, canvas, callback);
  }

  deleteCanvas(canvasId, callback) {
    return this.deleteData("", canvasId, callback);
  }
}

export default _Canvases;