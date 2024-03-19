import React, { Component } from "react";
import cx from "classnames";

import "resources/bootstrap.min.module.css";
import c from "resources/css/auth/RecoveryMessage.module.css";
import { lcs } from "../util/Locales";
import { Link } from 'react-router-dom'


class RecoveryMessage extends Component
{
  render()
  {
    const { type } = this.props.match.params;

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
              {type == "request" ?
                <div>
                  <h2 className={c.title}>{lcs("recovery_title")}</h2>
                  <small>{lcs("email_confirmation_spam")}</small>
                </div> : null}

              {type == "changed" ?
                <div>
                  <h2 className={c.title}>{lcs("password_changed")}</h2>
                  <small>{lcs("password_changed_notice")}</small>
                  <br/>
                  <br/>
                  <Link to="/login" className={cx("btn", "btn-md", c.buttonGreen, c.mainButton)}>
                    {lcs("login")}
                  </Link>
                </div> : null}
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

export default RecoveryMessage;