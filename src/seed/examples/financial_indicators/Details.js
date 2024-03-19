import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/financial_indicators/Details.module.css";

const FINANCIAL_INDICATOR  = `
{
  financialIndicator {
    date
    netIncome
    grossProfileMargins
    ebitda
    cogs
    burnRate
    runway
    customers
    newCustomers
    customerAcquisitionCost
    customerLifetimeValue
    customerChurnRate
    projectDetail { }
  }
}
`;

function FinancialIndicatorDetails(props) {

  const { financial_indicator_id }  = props.match.params;
  const qFinancialIndicator = useDetail(FINANCIAL_INDICATOR, financial_indicator_id);

  if (qFinancialIndicator.loading) return <Loading />;
  if (qFinancialIndicator.error) return "Error";

  const { financialIndicator = {} } = qFinancialIndicator.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Date</label><br/>
      <label className={styles.txt}>{financialIndicator.date.toString()}</label>
      <br/>
      <label className={styles.lbl}>Net income</label><br/>
      <label className={styles.txt}>{financialIndicator.netIncome.toString()}</label>
      <br/>
      <label className={styles.lbl}>Gross profile margins</label><br/>
      <label className={styles.txt}>{financialIndicator.grossProfileMargins.toString()}</label>
      <br/>
      <label className={styles.lbl}>Ebitda</label><br/>
      <label className={styles.txt}>{financialIndicator.ebitda.toString()}</label>
      <br/>
      <label className={styles.lbl}>Cogs</label><br/>
      <label className={styles.txt}>{financialIndicator.cogs.toString()}</label>
      <br/>
      <label className={styles.lbl}>Burn rate</label><br/>
      <label className={styles.txt}>{financialIndicator.burnRate.toString()}</label>
      <br/>
      <label className={styles.lbl}>Runway</label><br/>
      <label className={styles.txt}>{financialIndicator.runway.toString()}</label>
      <br/>
      <label className={styles.lbl}>Customers</label><br/>
      <label className={styles.txt}>{financialIndicator.customers.toString()}</label>
      <br/>
      <label className={styles.lbl}>New customers</label><br/>
      <label className={styles.txt}>{financialIndicator.newCustomers.toString()}</label>
      <br/>
      <label className={styles.lbl}>Customer acquisition cost</label><br/>
      <label className={styles.txt}>{financialIndicator.customerAcquisitionCost.toString()}</label>
      <br/>
      <label className={styles.lbl}>Customer lifetime value</label><br/>
      <label className={styles.txt}>{financialIndicator.customerLifetimeValue.toString()}</label>
      <br/>
      <label className={styles.lbl}>Customer churn rate</label><br/>
      <label className={styles.txt}>{financialIndicator.customerChurnRate.toString()}</label>
      <br/>
    </div>
  );
}

export default FinancialIndicatorDetails;