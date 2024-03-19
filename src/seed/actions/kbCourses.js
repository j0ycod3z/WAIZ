/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _KbCourses extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
        "sections.*",
      ];

    super(
      "KB_COURSES",
      "kb_courses",
      (state) => state.kbCourses,
      fetch
    );
  }

  getKbCourseList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getKbCourseDetails(kbCourseId, callback) {
    return this.getDetails("", kbCourseId, callback);
  }

  saveKbCourse(kbCourse, callback) {
    return this.postData("", kbCourse, callback);
  }

  setKbCourse(kbCourseId, kbCourse, callback) {
    return this.putData("", kbCourseId, kbCourse, callback);
  }

  deleteKbCourse(kbCourseId, callback) {
    return this.deleteData("", kbCourseId, callback);
  }
}

export default _KbCourses;