import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/financial_indicators/List.module.css";

const FINANCIAL_INDICATORS  = `
{
  financialIndicators {
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

function FinancialIndicatorList(props)
{
  const { url } = props.match;

  const qFinancialIndicators = useQuery(FINANCIAL_INDICATORS);

  if (qFinancialIndicators.loading) return <Loading />;
  if (qFinancialIndicators.error) return "Error";

  const { financialIndicators } = qFinancialIndicators.data;

  const financialIndicatorList = financialIndicators.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { financialIndicatorList }
    </div>
  );
}

export default FinancialIndicatorList;