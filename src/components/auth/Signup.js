import React, { useState } from "react";
import redux from 'seed/redux'
import cx from "classnames";
import { lcs, lang } from 'components/util/Locales';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';
import "react-bootstrap";
import c from "resources/css/auth/Signup.module.css";

import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

function Signup(props) {
  const [state, setState] = useState({});

  const onSubmit = (values) => {
    values.lang = lang;
    const { url } = props.match;

    if (values.password !== values.password2)
      return setState(s => ({ error: lcs("password_dont_match") }));

    const callback = (res) => {
      if (res.ok)
        props.history.replace(`${url}/welcome`);
      else setState((s) => ({
        error: res.body.status === 409 ?
          lcs("user_already_registered") :
          lcs("an_error_has_ocurred")
      }));
      setState((s) => ({ loading: false }));
    }
    setState((s) => ({ loading: true }));
    props.signup(values, callback);
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

      <div className={cx(c.container, "container")}> {/*, 'animated fadeIn'*/}
        <div className={cx("row", "justify-content-center")}>
          <div className={cx("col-md-5", "col-lg-5", c.formCard)}>
            <h2 className={c.title}>{lcs("sign_up")}</h2>

            {state.loading ?
              <CircularProgress className={c.loading} size="20" /> : null
            }

            <Formik
              initialValues={{
                name: "",
                last_name: "",
                email: "",
                password: "",
                password2: ""
              }}
              onSubmit={onSubmit}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <div className={cx("form-group")}>
                    <Field type="text" name="name" placeholder="First Name" className={cx("form-control", c.input)} required />
                  </div>
                  <div className={cx("form-group")}>
                    <Field type="text" name="last_name" placeholder="Last Name" className={cx("form-control", c.input)} required />
                  </div>
                  <div className={cx("form-group")}>
                    <Field type="email" name="email" placeholder="Email" className={cx("form-control", c.input)} required />
                  </div>
                  <div className={cx("form-group")}>
                    <Field type="password" name="password" placeholder="Password" className={cx("form-control", c.input)} required />
                  </div>
                  <div className={cx("form-group")}>
                    <Field type="password" name="password2" placeholder="Confirm Password" className={cx("form-control", c.input)} required />
                  </div>
                  {state.error && (
                    <div className={cx(c.error, "animated", "fadeIn")}>
                      <div>{state.error}</div>
                    </div>
                  )}
                  <div>
                    <button
                      className={cx("btn", "btn-md", c.buttonGreen, c.mainButton)}
                      type="submit"
                    >
                      {lcs("sign_up")}
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
          <div className={cx("col-md-4", "col-lg-4")}>
            <h2 className={c.title2}>{lcs("sign_up_title")}</h2>
            <h4 className={cx(c.subtitle)}>{lcs("sign_up_notice")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(Signup);