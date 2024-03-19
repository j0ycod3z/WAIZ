/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _TrlQuestions extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_name.*",
        "trl.*",
      ];

    super(
      "TRL_QUESTIONS",
      "trl_questions",
      (state) => state.trlQuestions,
      fetch
    );
  }

  getTrlQuestionList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getTrlQuestionDetails(trlQuestionId, callback) {
    return this.getDetails("", trlQuestionId, callback);
  }

  saveTrlQuestion(trlQuestion, callback) {
    return this.postData("", trlQuestion, callback);
  }

  setTrlQuestion(trlQuestionId, trlQuestion, callback) {
    return this.putData("", trlQuestionId, trlQuestion, callback);
  }

  deleteTrlQuestion(trlQuestionId, callback) {
    return this.deleteData("", trlQuestionId, callback);
  }
}

export default _TrlQuestions;