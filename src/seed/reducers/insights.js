/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/
import Actions from "seed/actions/insights";

import Reducer from "seed/helpers/reducer";

class _Insights extends Reducer {

  constructor() {
    super(new Actions());
  }

  reducer = (state, action) =>
    this.baseReducer(state, action);
}

export default _Insights;