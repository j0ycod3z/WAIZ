/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _KbSections extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
        "l_description.*",
        "course.*",
        "items.*",
      ];

    super(
      "KB_SECTIONS",
      "kb_sections",
      (state) => state.kbSections,
      fetch
    );
  }

  getKbSectionList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getKbSectionDetails(kbSectionId, callback) {
    return this.getDetails("", kbSectionId, callback);
  }

  saveKbSection(kbSection, callback) {
    return this.postData("", kbSection, callback);
  }

  setKbSection(kbSectionId, kbSection, callback) {
    return this.putData("", kbSectionId, kbSection, callback);
  }

  deleteKbSection(kbSectionId, callback) {
    return this.deleteData("", kbSectionId, callback);
  }
}

export default _KbSections;