import React from "react";
import cx from "classnames";

import "react-bootstrap";
import c from "resources/css/auth/RecoveryMessage.module.css";
import { lcs } from "../util/Locales";
import { Link } from 'react-router-dom'
import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

function RecoveryMessage(props) {
  const onClickBack = () => {
    props.history.replace(`/login`);
  }

  const { type } = props.match.params;

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
        <div className={cx("row", "justify-content-center")}>
          <div className={cx("col-md-6", "col-lg-6", c.formCard)}>
            {type === "request" ?
              <div>
                <h2 className={c.title}>{lcs("recovery_title")}</h2>
                <small>{lcs("email_confirmation_spam")}</small>
              </div> : null}

            {type === "changed" ?
              <div>
                <h2 className={c.title}>{lcs("password_changed")}</h2>
                <small>{lcs("password_changed_notice")}</small>
                <br/>
                <br/>
                <Link to="/login" className={cx("btn", "btn-md", c.buttonGreen, c.mainButton)}>
                  {lcs("login")}
                </Link>
              </div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecoveryMessage;