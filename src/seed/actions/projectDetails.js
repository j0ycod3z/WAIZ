/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProjectDetails extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "project.*",
        "features.*",
      ];

    super(
      "PROJECT_DETAILS",
      "project_details",
      (state) => state.projectDetails,
      fetch
    );
  }

  getProjectDetailList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProjectDetailDetails(projectDetailId, callback) {
    return this.getDetails("", projectDetailId, callback);
  }

  saveProjectDetail(projectDetail, callback) {
    return this.postData("", projectDetail, callback);
  }

  setProjectDetail(projectDetailId, projectDetail, callback) {
    return this.putData("", projectDetailId, projectDetail, callback);
  }

  deleteProjectDetail(projectDetailId, callback) {
    return this.deleteData("", projectDetailId, callback);
  }
}

export default _ProjectDetails;