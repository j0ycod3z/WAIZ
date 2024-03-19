/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _AreaTags extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
      ];

    super(
      "AREA_TAGS",
      "area_tags",
      (state) => state.areaTags,
      fetch
    );
  }

  getAreaTagList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getAreaTagDetails(areaTagId, callback) {
    return this.getDetails("", areaTagId, callback);
  }

  saveAreaTag(areaTag, callback) {
    return this.postData("", areaTag, callback);
  }

  setAreaTag(areaTagId, areaTag, callback) {
    return this.putData("", areaTagId, areaTag, callback);
  }

  deleteAreaTag(areaTagId, callback) {
    return this.deleteData("", areaTagId, callback);
  }
}

export default _AreaTags;