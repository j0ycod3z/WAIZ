/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Projects extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "canvas_type2.*",
        "admin.*",
        "cohort.*",
        "mentors.*",
        "members.*",
        "canvas.*",
      ];

    super(
      "PROJECTS",
      "projects",
      (state) => state.projects,
      fetch
    );
  }

  getProjectList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProjectDetails(projectId, callback) {
    return this.getDetails("", projectId, callback);
  }

  saveProject(project, callback) {
    return this.postData("", project, callback);
  }

  setProject(projectId, project, callback) {
    return this.putData("", projectId, project, callback);
  }

  deleteProject(projectId, callback) {
    return this.deleteData("", projectId, callback);
  }
}

export default _Projects;