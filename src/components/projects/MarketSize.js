import React, { Component } from "react";
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { hasProjectPermission } from 'components/util/Permissions';

import 'resources/bootstrap.min.module.css';
import c from 'resources/css/projects/Profile.module.css';

class MarketSize extends Component
{

  renderInput(type, value, onChange)
  {
    return (
      <input
        type="number"
        placeholder="USD"
        className={cx("form-control", c.input)}
        name={type}
        onChange={onChange}
        value={value}
      />
    );
  }

  render()
  {
    const { projectDetails = {} } = this.props;

    const total = projectDetails.total_available_market;
    const totalS = this.state.projectDetails.total_available_market;
    const served = projectDetails.served_available_market;
    const servedS = this.state.projectDetails.served_available_market;
    const target = projectDetails.target_market
    const targetS = this.state.projectDetails.target_market

    function format(num)
    {
      let format = num.toFixed(0);
      if (num > 1000) format = parseFloat(num / 1000).toFixed(0) + "k";
      if (num > 1000000) format = parseFloat(num / 1000000).toFixed(1) + "M"
      if (num > 1000000000) format = parseFloat(num / 1000000000).toFixed(1) + "B"
      return format;
    }

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("market_size")}&nbsp;
            {!this.state.editing && hasProjectPermission(this.props.project, ["MEMBER"]) ?
              <button onClick={this.onClickOpen} className={cx(c.edit)}>
                <i className="fas fa-edit" />
              </button> : null}
          </h5>
          <div className={"row"}>
            <div className={cx("col-lg-5")}>
              <form onSubmit={this.onSubmit}>
                <table className={c.marketData}>
                  <tbody>
                    <tr>
                      <td>1. {lcs("total_avaliable_market")}</td>
                    </tr>
                    <tr>
                      {this.state.editing ? (
                        this.renderInput("total", totalS, this.onTotalChange)
                      ) : (
                          <th className={c.fancyNumber}>$ {format(total)}<small style={{ fontSize: "0.65em" }}> USD</small></th>
                        )}
                    </tr>
                    <tr>
                      <td>2. {lcs("server_avaliable_market")}</td>
                    </tr>
                    <tr>
                      {this.state.editing ? (
                        this.renderInput("served", servedS, this.onServedChange)
                      ) : (
                          <th className={c.fancyNumber}>$ {format(served)}<small style={{ fontSize: "0.65em" }}> USD</small></th>
                        )}
                    </tr>
                    <tr>
                      <td>3. {lcs("target_market")}</td>
                    </tr>
                    <tr>
                      {this.state.editing ? (
                        this.renderInput("target", targetS, this.onTargetChange)
                      ) : (
                          <th className={c.fancyNumber}>$ {format(target)}<small style={{ fontSize: "0.65em" }}> USD</small></th>
                        )}
                    </tr>
                  </tbody>
                </table>
                {this.state.editing ? (
                  <div>
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
                  </div>
                ) : (
                    <div />
                  )}

              </form>
            </div>
            <div className={cx("col-lg-6")}>
              <div className={c.marketChart}>
                <div className={c.total}
                  style={{ backgroundColor: served > 0 ? "#1cab68" : "#f0f0f0" }}>
                  <div
                    className={c.server}
                    style={{
                      opacity: served > 0 ? 1 : 0,
                      width: 100 / Math.sqrt(total / served) + "%",
                      paddingBottom: 100 / Math.sqrt(total / served) + "%"
                    }}
                  >
                    <div
                      className={c.target}
                      style={{
                        opacity: served > 0 ? 1 : 0,
                        width: 100 / Math.sqrt(served / target) + "%",
                        paddingBottom: 100 / Math.sqrt(served / target) + "%"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
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
    this.onTotalChange = this.onTotalChange.bind(this);
    this.onServedChange = this.onServedChange.bind(this);
    this.onTargetChange = this.onTargetChange.bind(this);
  }

  onSubmit = e =>
  {
    e.preventDefault();
    this.setState(prevState => ({
      editing: false,
    }));
    const projectDetails = this.state.projectDetails;
    let body = {
      total_available_market: projectDetails.total_available_market,
      served_available_market: projectDetails.served_available_market,
      target_market: projectDetails.target_market
    };
    this.props.setProjectDetail(projectDetails.id, body);
  }

  onTotalChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.total_available_market = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onServedChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.served_available_market = e.target.value;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onTargetChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.target_market = e.target.value;
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

export default MarketSize;
