import React, { useState, useEffect } from "react";
import redux from 'seed/redux';

import { lcs } from "components/util/Locales"
import c from "resources/css/projects/FinancialBoard.module.css";

function FinancialBoard(props) {
  const {
    getFinancialIndicatorList,
    projectDetails,
    financialIndicators = [],
    setFinancialIndicator,
    saveFinancialIndicator,
    onClose,
  } = props;

  const [financialIndicator, setFinancialIndicatorState] = useState({});

  useEffect(() => {
    let isMounted = true;

    getFinancialIndicatorList({project_detail: projectDetails.id}, (res) => {
      if(isMounted) {
        let fi = {}
        if (res.body.length > 0) {
          fi = res.body.sort((r1, r2) => (new Date(r2.date)).getTime() - (new Date(r1.date)).getTime())[0];
          const date = new Date(fi.date);
          fi.date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
        }
        setFinancialIndicatorState(fi);
      }
    });
    
    return () => {
      isMounted = false;
    };
  }, [getFinancialIndicatorList, projectDetails.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      date: financialIndicator.date + "T12:00",
      net_income: financialIndicator.net_income,
      gross_profile_margins: financialIndicator.gross_profile_margins,
      ebitda: financialIndicator.ebitda,
      cogs: financialIndicator.cogs,
      burn_rate: financialIndicator.burn_rate,
      runway: financialIndicator.runway,
      customers: financialIndicator.customers,
      new_customers: financialIndicator.new_customers,
      customer_acquisition_cost: financialIndicator.customer_acquisition_cost,
      customer_lifetime_value: financialIndicator.customer_lifetime_value,
      customer_churn_rate: financialIndicator.customer_churn_rate,
      project_detail_id: projectDetails.id
    }

    let current = financialIndicators.filter((f) => f.date == financialIndicator.date);
    if (current.length > 0)
      setFinancialIndicator(current[0].id, body);
    else saveFinancialIndicator(body);
    
    onClose();
  };

  const onDateChange = (e) => {
    let fi = { ...financialIndicator };
    const fis = [...financialIndicators].sort((r1, r2) => (new Date(r2.date)).getTime() - (new Date(r1.date)).getTime());
    for (let f of fis) {
      if ((new Date(f.date)).getTime() <= (new Date(e.target.value + "T12:00")).getTime()) {
        fi = f;
        break;
      }
    }
    fi.date = e.target.value;
    setFinancialIndicatorState(fi);
  };

  const handleChange = (field) => (e) => {
    setFinancialIndicatorState({
      ...financialIndicator,
      [field]: e.target.value,
    });
  };
  
  return (
    <div className={c.module}>
      <div className={c.header}>
        {lcs("financial_board")}
      </div>
      <div className={c.content}>
        <form onSubmit={onSubmit}>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">{lcs("interval")}</th>
                <td>
                  <input type="date" name="date" id="date" value={financialIndicator.date || ""} onChange={onDateChange} required />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("net_income")}</th>
                <td>
                  <input type="text" placeholder="USD" name="net_income" id="net_income" value={financialIndicator.net_income || ""} onChange={handleChange("net_income")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("gross_profit_margins")}</th>
                <td>
                  <input type="text" placeholder="%" name="gross_profit_margins" id="gross_profit_margins" value={financialIndicator.gross_profile_margins || ""} onChange={handleChange("gross_profile_margins")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("ebitda")}</th>
                <td>
                  <input type="text" placeholder="USD" name="ebitda" id="ebitda" value={financialIndicator.ebitda || ""} onChange={handleChange("ebitda")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("cogs")}</th>
                <td>
                  <input type="text" placeholder="USD" name="cogs" id="cogs" value={financialIndicator.cogs || ""} onChange={handleChange("cogs")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("burn_rate")}</th>
                <td>
                  <input type="text" placeholder="USD" name="burn_rate" id="burn_rate" value={financialIndicator.burn_rate || ""} onChange={handleChange("burn_rate")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("runaway")}</th>
                <td>
                  <input type="text" placeholder="USD" name="runway" id="runway" value={financialIndicator.runway || ""} onChange={handleChange("runway")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("customers")}</th>
                <td>
                  <input type="text" placeholder="#" name="customers" id="customers" value={financialIndicator.customers || ""} onChange={handleChange("customers")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("new_customers")}</th>
                <td>
                  <input type="text" placeholder="#" name="new_customers" id="new_customers" value={financialIndicator.new_customers || ""} onChange={handleChange("new_customers")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("customer_acquisition_cost")}</th>
                <td>
                  <input type="text" placeholder="USD" name="customer_acquisition_cost" id="customer_acquisition_cost" value={financialIndicator.customer_acquisition_cost || ""} onChange={handleChange("customer_acquisition_cost")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("customer_lifetime_value")}</th>
                <td>
                  <input type="text" placeholder="USD" name="customer_lifetime_value" id="customer_lifetime_value" value={financialIndicator.customer_lifetime_value || ""} onChange={handleChange("customer_lifetime_value")} />
                </td>
              </tr>
              <tr>
                <th scope="row">{lcs("customer_churn_rate")}</th>
                <td>
                  <input type="text" placeholder="%" name="customer_churn_rate" id="customer_churn_rate" value={financialIndicator.customer_churn_rate || ""} onChange={handleChange("customer_churn_rate")} />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className={c.call}>{lcs("save")}</button>
        </form>
      </div>
    </div>
  );
}

export default redux(FinancialBoard);