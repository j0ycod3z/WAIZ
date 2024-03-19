import React, { Component } from "react";
import cx from "classnames";

import "resources/bootstrap.min.module.css";
import c from "resources/css/auth/SignupWelcome.module.css";
import { lcs } from "../util/Locales";

class Signup extends Component
{
  render()
  {
    return (
      <div className={c.module}>

        <div className={cx("jumbotron", "jumbotron-fluid", c.jumbotron)}>
          <img src={require("resources/images/ic_back.svg")} className={c.back} alt="back"
            onClick={this.onClickBack}></img>
          <div className={cx("container")}>
            <img
              src={require("resources/images/canou_logo.svg")}
              className={c.image}
              alt="Logo" />
          </div>
        </div>

        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-md-3", "col-lg-3")} />
            <div className={cx("col-md-6", "col-lg-6", c.formCard)}>
              <h2 className={c.title}>{lcs("one_more_step")}</h2>
              <label>{lcs("email_confirmation_notice")}.</label><br/>
              <small>{lcs("email_confirmation_spam")}</small>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onClickBack = this.onClickBack.bind(this);
  }

  onClickBack()
  {
    this.props.history.replace(`/login`);
  }
}

export default Signup;