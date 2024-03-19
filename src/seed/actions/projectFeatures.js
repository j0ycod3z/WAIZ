/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProjectFeatures extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
      ];

    super(
      "PROJECT_FEATURES",
      "project_features",
      (state) => state.projectFeatures,
      fetch
    );
  }

  getProjectFeatureList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProjectFeatureDetails(projectFeatureId, callback) {
    return this.getDetails("", projectFeatureId, callback);
  }

  saveProjectFeature(projectFeature, callback) {
    return this.postData("", projectFeature, callback);
  }

  setProjectFeature(projectFeatureId, projectFeature, callback) {
    return this.putData("", projectFeatureId, projectFeature, callback);
  }

  deleteProjectFeature(projectFeatureId, callback) {
    return this.deleteData("", projectFeatureId, callback);
  }
}

export default _ProjectFeatures;