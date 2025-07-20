import React, { Component } from "react";
import cx from 'classnames';
import { lcs } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';

import 'resources/bootstrap.min.module.css';
import c from 'resources/css/projects/Profile.module.css';

class KeyPerformanceIndicators extends Component
{
  render()
  {
    return (
      <div>{this.state.editing ? this.renderForm() : this.renderCard()}</div>
    );
  }

  renderCard()
  {
    const { projectDetails = {} } = this.props;

    const moneyFormat = num =>
    {
      let format = num.toFixed(0);
      if (num > 1000) format = parseFloat(num / 1000).toFixed(0) + "k";
      if (num > 1000000) format = parseFloat(num / 1000000).toFixed(1) + "M"
      if (num > 1000000000) format = parseFloat(num / 1000000000).toFixed(1) + "B"
      return format;
    }

    let salesFormat = moneyFormat(projectDetails.total_sales)
    let raisedFormat = moneyFormat(projectDetails.raised_capital)
    let investmentFormat = moneyFormat(projectDetails.investment_request);


    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("key_performance_indicators")}&nbsp;
            {hasProjectPermission(this.props.project, ["MEMBER"]) ?
              <button onClick={this.onClickOpen} className={cx(c.edit)}>
                <i className="fas fa-edit" />
              </button> : null}
          </h5>
          <div className={cx("card-text")}>
            <table className={c.keyPerformanceTable}>
              <tbody>
                <tr>
                  <td className={c.secondary}>
                    <i className="fas fa-coins fa-3x" />
                  </td>
                  <td className={c.secondary}>
                    <i className="fas fa-users fa-3x" />
                  </td>
                  <td className={c.secondary}>
                    <i className="fas fa-money-bill fa-3x" />
                  </td>
                  <td className={c.secondary}>
                    <i className="fas fa-money-check-alt fa-3x" />
                  </td>
                  <td className={c.secondary}>
                    <i className="fas fa-file-signature fa-3x" />
                  </td>
                </tr>
                <tr className={c.subtitle}>
                  <td>{lcs("sales")}</td>
                  <td>{lcs("employees")}</td>
                  <td>{lcs("raised_capital")}</td>
                  <td>{lcs("investment_request")}</td>
                  <td>{lcs("patents")}</td>
                </tr>
                <tr className={c.featuresNumbers}>
                  <td>{"$" + salesFormat}<small style={{ fontSize: "0.6em" }}> USD</small></td>
                  <td>{projectDetails.num_employees > 0 ? projectDetails.num_employees : "n/a"}</td>
                  <td>{"$" + raisedFormat}<small style={{ fontSize: "0.6em" }}> USD</small></td>
                  <td>{"$" + investmentFormat}<small style={{ fontSize: "0.6em" }}> USD</small></td>
                  <td>{projectDetails.num_patents > 0 ? projectDetails.num_patents : "n/a"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  renderForm()
  {
    const { projectDetails = {} } = this.state;

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("key_performance_indicators")}&nbsp;
          </h5>
          <div className={cx("card-text")}>
            <form onSubmit={this.onSubmit}>
              <table className={c.keyPerformanceTable}>
                <tbody>
                  <tr>
                    <td className={c.secondary}>
                      <i className="fas fa-coins fa-3x" />
                    </td>
                    <td className={c.secondary}>
                      <i className="fas fa-users fa-3x" />
                    </td>
                    <td className={c.secondary}>
                      <i className="fas fa-money-bill fa-3x" />
                    </td>
                    <td className={c.secondary}>
                      <i className="fas fa-money-check-alt fa-3x" />
                    </td>
                    <td className={c.secondary}>
                      <i className="fas fa-file-signature fa-3x" />
                    </td>
                  </tr>
                  <tr className={c.subtitle}>
                    <td>{lcs("sales")}</td>
                    <td>{lcs("employees")}</td>
                    <td>{lcs("raised_capital")}</td>
                    <td>{lcs("investment_request")}</td>
                    <td>{lcs("patents")}</td>
                  </tr>
                  <tr className={c.featuresNumbers}>
                    <td>
                      <input
                        type="number"
                        placeholder="USD"
                        className={cx("form-control", c.input)}
                        name="sales"
                        value={projectDetails.total_sales}
                        onChange={this.onSalesChange} />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="#"
                        className={cx("form-control", c.input)}
                        name="employees"
                        value={projectDetails.num_employees}
                        onChange={this.onEmployeesChange} />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="USD"
                        className={cx("form-control", c.input)}
                        name="investors"
                        value={projectDetails.raised_capital}
                        onChange={this.onRaisedChange} />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="USD"
                        className={cx("form-control", c.input)}
                        name="partnerships"
                        value={projectDetails.investment_request}
                        onChange={this.onInvestmentChange} />
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="#"
                        className={cx("form-control", c.input)}
                        name="patents"
                        value={projectDetails.num_patents}
                        onChange={this.onPatentsChange} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <button
                type="submit"
                className={cx("btn", c.buttonGreen)}>
                {lcs("save_changes")}
              </button>
              <button
                type="button"
                className={cx("btn", "btn-light")}
                onClick={this.onClickCancel}>
                {lcs("cancel")}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      editing: false,
      projectDetails: Object.assign({}, props.projectDetails)
    };

    this.onClickOpen = this.onClickOpen.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onSalesChange = this.onSalesChange.bind(this);
    this.onEmployeesChange = this.onEmployeesChange.bind(this);
    this.onRaisedChange = this.onRaisedChange.bind(this);
    this.onInvestmentChange = this.onInvestmentChange.bind(this);
    this.onPatentsChange = this.onPatentsChange.bind(this);
  }


  onSubmit = e =>
  {
    e.preventDefault();
    this.setState(prevState => ({
      editing: false,
    }));
    const projectDetails = this.state.projectDetails;
    let body = {
      total_sales: projectDetails.total_sales,
      num_employees: projectDetails.num_employees,
      raised_capital: projectDetails.raised_capital,
      investment_request: projectDetails.investment_request,
      num_patents: projectDetails.num_patents
    };
    this.props.setProjectDetail(projectDetails.id, body);
  }

  onSalesChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.total_sales = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onEmployeesChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.num_employees = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onRaisedChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.raised_capital = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onInvestmentChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.investment_request = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onPatentsChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.num_patents = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onClickOpen = e =>
  {
    this.setState(prevState => ({
      editing: true
    }));
  }

  onClickCancel = e =>
  {
    this.setState(prevState => ({
      editing: false
    }));
  }
}

export default KeyPerformanceIndicators;
