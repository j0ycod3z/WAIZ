/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Interviews extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "interviewee_tag.*",
        "hypothesis.*",
        "canvas.*",
        "project.*",
        "creator.*",
      ];

    super(
      "INTERVIEWS",
      "interviews",
      (state) => state.interviews,
      fetch
    );
  }

  getInterviewList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getInterviewDetails(interviewId, callback) {
    return this.getDetails("", interviewId, callback);
  }

  saveInterview(interview, callback) {
    return this.postData("", interview, callback);
  }

  setInterview(interviewId, interview, callback) {
    return this.putData("", interviewId, interview, callback);
  }

  deleteInterview(interviewId, callback) {
    return this.deleteData("", interviewId, callback);
  }
}

export default _Interviews;