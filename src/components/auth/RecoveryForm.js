import React, { useState } from "react";
import cx from "classnames";
import redux from 'seed/redux'
import { lcs } from 'components/util/Locales';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';
import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

import "react-bootstrap";
import c from "resources/css/auth/RecoveryForm.module.css";

function RecoveryForm(props) {
  const [state, setState] = useState({});

  const onSubmit = (values) => {
    // const { url } = props.match;
    const { token } = props.match.params;

    if (values.password !== values.password2)
      return setState((s) => ({ error: lcs("password_dont_match") }));

    const body = {
      password: values.password,
      token: token
    }

    const callback = (res) => {
      if (res.ok)
        props.history.replace(`/recovery_message/changed`);
      else setState(s => ({
        error: res.body.status === 404 ?
          lcs("unregistered_user") :
          lcs("an_error_has_ocurred")
      }));
      setState((s) => ({ loading: false }));
    }
    setState((s) => ({ loading: true }));
    props.changePassword(body, callback)
  }

  const onClickBack = () => {
    props.history.goBack();
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
        <div className={cx("row", "justify-content-center")}>
          <div className={cx("col-md-4", "col-lg-4")}>
            <h2 className={c.title}>{lcs("recover_password")}</h2>

            {state.loading ?
              <CircularProgress className={c.loading} size="20" /> : null
            }

            <Formik
              initialValues={{
                password: "",
                password2: ""
              }}
              onSubmit={onSubmit}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <div className={cx("form-group")}>
                    <Field
                      type="password"
                      name="password"
                      className={cx("form-control", c.input)}
                      placeholder={lcs("password")}
                      required
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <Field
                      type="password"
                      name="password2"
                      className={cx("form-control", c.input)}
                      placeholder={lcs("confirm_password")}
                      required
                    />
                  </div>
                  {state.error ?
                    <div className={c.error + ' animated fadeIn'}><div> {state.error}</div></div> : null}
                  <div>
                    <button className={cx("btn", "btn-md", c.buttonGreen, c.mainButton)}
                      type="submit">
                      {lcs("send")}
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(RecoveryForm);