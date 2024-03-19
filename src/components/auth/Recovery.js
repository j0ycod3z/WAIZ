import React, { Component } from "react";
import cx from "classnames";
import redux from 'seed/redux'
import { lcs } from 'components/util/Locales';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';


import "resources/bootstrap.min.module.css";
import c from "resources/css/auth/Recovery.module.css";

class Recovery extends Component
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

        <div className={cx("container", "animated fadeIn")}>
          <div className={cx("row")}>
            <div className={cx("col-md-4", "col-lg-4")} />
            <div className={cx("col-md-4", "col-lg-4")}>
              <h2 className={c.title}>{lcs("recover_password")}</h2>

              {this.state.loading ?
                <CircularProgress className={c.loading} size="20" /> : null
              }

              <Formik
                onSubmit={this.onSubmit}
                render={props => (
                  <form onSubmit={props.handleSubmit}>
                    <div className={cx("form-group")}>
                      <label for="email">{lcs("recovery_notice")}</label>
                      <Field
                        type="email" name="email"
                        className={cx("form-control", c.input)} required
                      />
                    </div>
                    {this.state.error ?
                      <div className={c.error + ' animated fadeIn'}><div> {this.state.error}</div></div> : null}
                    <div>
                      <button className={cx("btn", "btn-md", c.buttonGreen, c.mainButton)}
                        type="submit">
                        {lcs("send")}
                      </button>
                    </div>
                  </form>
                )}
              />
              <br />
              <br />
            </div>
            <div className={cx("col-md-4", "col-lg-4")}></div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
  }

  onSubmit(values)
  {
    const body = { email: values.email }
    const { url } = this.props.match;

    const callback = res =>
    {
      if (res.ok)
        this.props.history.replace(`/recovery_message/request`);
      else this.setState(s => ({
        error: res.body.status == 404 ?
          lcs("unregistered_user") :
          lcs("an_error_has_ocurred")
      }));
      this.setState(s => ({ loading: false }));
    }
    this.setState(s => ({ loading: true }));
    this.props.recoverPassword(body, callback)
  }

  onClickBack()
  {
    this.props.history.goBack();
  }
}

export default redux(Recovery);