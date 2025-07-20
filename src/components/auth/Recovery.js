import React, { useState } from "react";
import cx from "classnames";
import redux from 'seed/redux'
import { lcs } from 'components/util/Locales';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';
import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

import "resources/bootstrap.min.module.css";
import c from "resources/css/auth/Recovery.module.css";

function Recovery(props) {
  const [state, setState] = useState({});

  const onSubmit = (values) => {
    const body = { email: values.email }
    // const { url } = props.match;

    const callback = (res) => {
      if (res.ok)
        props.history.replace(`/recovery_message/request`);
      else setState(s => ({
        error: res.body.status === 404 ?
          lcs("unregistered_user") :
          lcs("an_error_has_ocurred")
      }));
      setState(s => ({ loading: false }));
    }
    setState(s => ({ loading: true }));
    props.recoverPassword(body, callback)
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

      <div className={cx("container")}> {/*, "animated fadeIn" */}
        <div className={cx("row", "justify-content-center")}>
          <div className={cx("col-md-6", "col-lg-4")}>
            <h2 className={c.title}>{lcs("recover_password")}</h2>

            {state.loading ?
              <CircularProgress className={c.loading} size="20" /> : null
            }

            <Formik
              onSubmit={onSubmit}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <div className={cx("form-group")}>
                    <label for="email">{lcs("recovery_notice")}</label>
                    <Field
                      type="email"
                      name="email"
                      className={cx("form-control", c.input)}
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

export default redux(Recovery);