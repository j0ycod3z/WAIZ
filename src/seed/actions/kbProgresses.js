/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _KbProgresses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "user.*",
        "item.*",
      ];

    super(
      "KB_PROGRESSES",
      "kb_progresses",
      (state) => state.kbProgresses,
      fetch
    );
  }

  getKbProgressList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getKbProgressDetails(kbProgressId, callback) {
    return this.getDetails("", kbProgressId, callback);
  }

  saveKbProgress(kbProgress, callback) {
    return this.postData("", kbProgress, callback);
  }

  setKbProgress(kbProgressId, kbProgress, callback) {
    return this.putData("", kbProgressId, kbProgress, callback);
  }

  deleteKbProgress(kbProgressId, callback) {
    return this.deleteData("", kbProgressId, callback);
  }
}

export default _KbProgresses;