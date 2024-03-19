import React, { Component } from "react";
import redux from 'seed/redux';
import { Formik, Field } from 'formik';

import { lcs } from "components/util/Locales"
import c from "resources/css/projects/FinancialBoard.module.css";
import "resources/bootstrap.min.module.css";

class FinancialBoard extends Component
{
  render()
  {
    const { financialIndicator = {} } = this.state;
    return (
      <div className={c.module}>
        <div className={c.header}>
          {lcs("financial_board")}
        </div>
        <div className={c.content}>

          <form onSubmit={this.onSubmit}>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">{lcs("interval")}</th>
                  <th scope="col">
                    <input
                      type="date"
                      value={financialIndicator.date}
                      onChange={this.onDateChange}
                      required={true} />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{lcs("net_income")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.net_income}
                      onChange={this.onNetIncomeChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("gross_profit_margins")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="%"
                      value={financialIndicator.gross_profit_margins}
                      onChange={this.onGrossProfileMarginsChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("ebitda")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.ebitda}
                      onChange={this.onEbitdaChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("cogs")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.cogs}
                      onChange={this.onCogsChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("burn_rate")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.burn_rate}
                      onChange={this.onBurnRateChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("runaway")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.runaway}
                      onChange={this.onRunwayChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("customers")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="#"
                      value={financialIndicator.customers}
                      onChange={this.onCustomersChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("new_customers")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="#"
                      value={financialIndicator.new_customers}
                      onChange={this.onNewCustomersChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("customer_acquisition_cost")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.customer_acquisition_cost}
                      onChange={this.onCustomerAcquisitionCostChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("customer_lifetime_value")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="USD"
                      value={financialIndicator.customer_lifetime_value}
                      onChange={this.onCustomerLifetimeValueChange} />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{lcs("customer_churn_rate")}</th>
                  <td>
                    <input
                      type="text"
                      placeholder="%"
                      value={financialIndicator.customer_churn_rate}
                      onChange={this.onCustomerChurnRateChange} />
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

  constructor(props)
  {
    super(props);
    this.state = {
      financialIndicator: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onNetIncomeChange = this.onNetIncomeChange.bind(this);
    this.onGrossProfileMarginsChange = this.onGrossProfileMarginsChange.bind(this)
    this.onEbitdaChange = this.onEbitdaChange.bind(this)
    this.onCogsChange = this.onCogsChange.bind(this)
    this.onBurnRateChange = this.onBurnRateChange.bind(this)
    this.onRunwayChange = this.onRunwayChange.bind(this)
    this.onCustomersChange = this.onCustomersChange.bind(this)

    this.onNewCustomersChange = this.onNewCustomersChange.bind(this)
    this.onCustomerAcquisitionCostChange = this.onCustomerAcquisitionCostChange.bind(this)
    this.onCustomerLifetimeValueChange = this.onCustomerLifetimeValueChange.bind(this)
    this.onCustomerChurnRateChange = this.onCustomerChurnRateChange.bind(this)
  }

  componentDidMount()
  {
    const callback = res =>
    {
      let financialIndicator = {}
      if (res.body.length > 0) {
        financialIndicator = res.body.sort((r1, r2) => (new Date(r2.date)).getTime() - (new Date(r1.date)).getTime())[0];
        const date = new Date(financialIndicator.date);
        financialIndicator.date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
      }
      this.setState({ financialIndicator: financialIndicator })
    }

    this.props.getFinancialIndicatorList({
      project_detail: this.props.projectDetails.id
    }, callback);
  }

  onSubmit = e =>
  {
    e.preventDefault();
    let financialIndicator = this.state.financialIndicator;
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
      project_detail_id: this.props.projectDetails.id
    }

    let { financialIndicators = [] } = this.props;
    let current = financialIndicators
      .filter(f => f.date == financialIndicator.date);
    if (current.length > 0)
      this.props.setFinancialIndicator(current[0].id, body)
    else this.props.saveFinancialIndicator(body)
  }

  onDateChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    const fis = this.props.financialIndicators.sort((r1, r2) => (new Date(r2.date)).getTime() - (new Date(r1.date)).getTime());
    for (let fi of fis) {
      if ((new Date(fi.date)).getTime() <= (new Date(e.target.value + "T12:00")).getTime()) {
        financialIndicator = fi;
        break;
      }
    }

    financialIndicator.date = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onNetIncomeChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.net_income = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onGrossProfileMarginsChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.gross_profile_margins = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onEbitdaChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.ebitda = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onCogsChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.cogs = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onBurnRateChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.burn_rate = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onRunwayChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.runway = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onCustomersChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.customers = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onNewCustomersChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.new_customers = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onCustomerAcquisitionCostChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.customer_acquisition_cost = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onCustomerLifetimeValueChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.customer_lifetime_value = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }

  onCustomerChurnRateChange = e =>
  {
    let financialIndicator = this.state.financialIndicator;
    financialIndicator.customer_churn_rate = e.target.value;
    this.setState({ financialIndicator: financialIndicator })
  }


}

export default redux(FinancialBoard);
