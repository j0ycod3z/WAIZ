/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _AreaHelps extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_content.*",
        "l_video_id.*",
        "area.*",
      ];

    super(
      "AREA_HELPS",
      "area_helps",
      (state) => state.areaHelps,
      fetch
    );
  }

  getAreaHelpList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getAreaHelpDetails(areaHelpId, callback) {
    return this.getDetails("", areaHelpId, callback);
  }

  saveAreaHelp(areaHelp, callback) {
    return this.postData("", areaHelp, callback);
  }

  setAreaHelp(areaHelpId, areaHelp, callback) {
    return this.putData("", areaHelpId, areaHelp, callback);
  }

  deleteAreaHelp(areaHelpId, callback) {
    return this.deleteData("", areaHelpId, callback);
  }
}

export default _AreaHelps;