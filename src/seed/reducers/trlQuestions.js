/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/
import Actions from "actions/trlQuestions";

import Reducer from "seed/helpers/reducer";

class _TrlQuestions extends Reducer {

  constructor() {
    super(new Actions());
  }

  reducer = (state, action) =>
    this.baseReducer(state, action);
}

export default _TrlQuestions;