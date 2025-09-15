/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _KbFiles extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "kb_item.*",
      ];

    super(
      "KB_FILES",
      "kb_files",
      (state) => state.kbFiles,
      fetch
    );
  }

  getKbFileList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getKbFileDetails(kbFileId, callback) {
    return this.getDetails("", kbFileId, callback);
  }

  saveKbFile(kbFile, callback) {
    return this.postData("", kbFile, callback);
  }

  setKbFile(kbFileId, kbFile, callback) {
    return this.putData("", kbFileId, kbFile, callback);
  }

  deleteKbFile(kbFileId, callback) {
    return this.deleteData("", kbFileId, callback);
  }
}

export default _KbFiles;