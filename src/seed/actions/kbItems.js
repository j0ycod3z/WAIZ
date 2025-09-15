/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _KbItems extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_text.*",
        "l_title.*",
        "section.*",
        "files.*",
      ];

    super(
      "KB_ITEMS",
      "kb_items",
      (state) => state.kbItems,
      fetch
    );
  }

  getKbItemList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getKbItemDetails(kbItemId, callback) {
    return this.getDetails("", kbItemId, callback);
  }

  saveKbItem(kbItem, callback) {
    return this.postData("", kbItem, callback);
  }

  setKbItem(kbItemId, kbItem, callback) {
    return this.putData("", kbItemId, kbItem, callback);
  }

  deleteKbItem(kbItemId, callback) {
    return this.deleteData("", kbItemId, callback);
  }
}

export default _KbItems;