/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _DeepAnswers extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "question.*",
        "canvas.*",
      ];

    super(
      "DEEP_ANSWERS",
      "deep_answers",
      (state) => state.deepAnswers,
      fetch
    );
  }

  getDeepAnswerList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getDeepAnswerDetails(deepAnswerId, callback) {
    return this.getDetails("", deepAnswerId, callback);
  }

  saveDeepAnswer(deepAnswer, callback) {
    return this.postData("", deepAnswer, callback);
  }

  setDeepAnswer(deepAnswerId, deepAnswer, callback) {
    return this.putData("", deepAnswerId, deepAnswer, callback);
  }

  deleteDeepAnswer(deepAnswerId, callback) {
    return this.deleteData("", deepAnswerId, callback);
  }
}

export default _DeepAnswers;