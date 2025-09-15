/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _FinancialIndicators extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "project_detail.*",
      ];

    super(
      "FINANCIAL_INDICATORS",
      "financial_indicators",
      (state) => state.financialIndicators,
      fetch
    );
  }

  getFinancialIndicatorList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getFinancialIndicatorDetails(financialIndicatorId, callback) {
    return this.getDetails("", financialIndicatorId, callback);
  }

  saveFinancialIndicator(financialIndicator, callback) {
    return this.postData("", financialIndicator, callback);
  }

  setFinancialIndicator(financialIndicatorId, financialIndicator, callback) {
    return this.putData("", financialIndicatorId, financialIndicator, callback);
  }

  deleteFinancialIndicator(financialIndicatorId, callback) {
    return this.deleteData("", financialIndicatorId, callback);
  }
}

export default _FinancialIndicators;