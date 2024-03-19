/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _Comments extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "hypothesis.*",
        "area.*",
        "project.*",
        "creator.*",
      ];

    super(
      "COMMENTS",
      "comments",
      (state) => state.comments,
      fetch
    );
  }

  getCommentList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getCommentDetails(commentId, callback) {
    return this.getDetails("", commentId, callback);
  }

  saveComment(comment, callback) {
    return this.postData("", comment, callback);
  }

  setComment(commentId, comment, callback) {
    return this.putData("", commentId, comment, callback);
  }

  deleteComment(commentId, callback) {
    return this.deleteData("", commentId, callback);
  }
}

export default _Comments;