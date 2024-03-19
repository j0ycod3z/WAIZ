/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _DeepQuestions extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "l_content.*",
        "area.*",
      ];

    super(
      "DEEP_QUESTIONS",
      "deep_questions",
      (state) => state.deepQuestions,
      fetch
    );
  }

  getDeepQuestionList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getDeepQuestionDetails(deepQuestionId, callback) {
    return this.getDetails("", deepQuestionId, callback);
  }

  saveDeepQuestion(deepQuestion, callback) {
    return this.postData("", deepQuestion, callback);
  }

  setDeepQuestion(deepQuestionId, deepQuestion, callback) {
    return this.putData("", deepQuestionId, deepQuestion, callback);
  }

  deleteDeepQuestion(deepQuestionId, callback) {
    return this.deleteData("", deepQuestionId, callback);
  }
}

export default _DeepQuestions;