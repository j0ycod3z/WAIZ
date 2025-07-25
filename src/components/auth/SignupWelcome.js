import React from "react";
import cx from "classnames";

import "react-bootstrap";
import c from "resources/css/auth/SignupWelcome.module.css";
import { lcs } from "../util/Locales";

import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

function Signup(props) {
  const onClickBack = () => {
    props.history.replace(`/login`);
  }

  return (
    <div className={c.module}>

      <div className={cx("d-flex", "align-items-center", c.jumbotron)}>
        <img
          src={backSvg}
          className={c.back}
          onClick={onClickBack}
          alt="back"
        />
        <div className={cx("container")}>
          <img
            src={waizLogo}
            className={c.image}
            alt="Logo"
          />
        </div>
      </div>

      <div className={cx("container")}>
        <div className={cx("row", "d-flex", "justify-content-center")}>
          <div className={cx("col-md-6", "col-lg-6", c.formCard)}>
            <h2 className={c.title}>{lcs("one_more_step")}</h2>
            <p>{lcs("email_confirmation_notice")}.</p><br/>
            <small>{lcs("email_confirmation_spam")}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;