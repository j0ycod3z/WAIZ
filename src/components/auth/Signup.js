import React, { Component } from "react";
import redux from 'seed/redux'
import cx from "classnames";
import { lcs, lang } from 'components/util/Locales';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';
import "resources/bootstrap.min.module.css";
import c from "resources/css/auth/Signup.module.css";

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

        <div className={cx(c.container, "container", "animated fadeIn")}>
          <div className={cx("row")}>
            <div className={cx("col-md-2", "col-lg-2")} />
            <div className={cx("col-md-5", "col-lg-5", c.formCard)}>
              <h2 className={c.title}>{lcs("sign_up")}</h2>

              {this.state.loading ?
                <CircularProgress className={c.loading} size="20" /> : null
              }

              <Formik
                onSubmit={this.onSubmit}
                render={props => (
                  <form onSubmit={props.handleSubmit}>
                    <div className={cx("form-group")}>
                      <label for="email">{lcs("name")}</label>
                      <Field
                        type="text" name="name"
                        className={cx("form-control", c.input)} required
                      />
                    </div>
                    <div className={cx("form-group")}>

                      <label for="email">{lcs("last_name")}</label>
                      <Field
                        type="text" name="last_name"
                        className={cx("form-control", c.input)} required
                      />
                    </div>
                    <div className={cx("form-group")}>
                      <label for="email">{lcs("email")}</label>
                      <Field
                        type="email" name="email"
                        className={cx("form-control", c.input)} required
                      />
                    </div>
                    <div className={cx("form-group")}>
                      <label for="password">{lcs("password")}</label>
                      <Field
                        type="password" name="password"
                        className={cx("form-control", c.input)} required
                      />
                    </div>
                    <div className={cx("form-group")}>
                      <label for="confirmPassword">{lcs("confirm_password")}</label>
                      <Field
                        type="password" name="password2"
                        className={cx("form-control", c.input)} required
                      />
                    </div>
                    <br />
                    {this.state.error ?
                      <div className={c.error + ' animated fadeIn'}><div> {this.state.error}</div></div> : null}
                    <div>
                      <button className={cx("btn", "btn-md", c.buttonGreen, c.mainButton)}
                        type="submit">
                        {lcs("sign_up")}
                      </button>
                    </div>
                  </form>
                )}
              />
              <br />
              <br />
            </div>
            <div className={cx("col-md-4", "col-lg-4")}
              style={{ padding: "30px" }}>
              <h2 className={c.title2}>
                {lcs("sign_up_title")}
              </h2>
              <h4 className={cx(c.subtitle)}>
                {lcs("sign_up_notice")}
              </h4>
            </div>
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
    values.lang = lang;
    const { url } = this.props.match;

    if (values.password != values.password2)
      return this.setState(s => ({ error: lcs("password_dont_match") }));

    const callback = res =>
    {
      if (res.ok)
        this.props.history.replace(`${url}/welcome`);
      else this.setState(s => ({
        error: res.body.status == 409 ?
          lcs("user_already_registered") :
          lcs("an_error_has_ocurred")
      }));
      this.setState(s => ({ loading: false }));
    }
    this.setState(s => ({ loading: true }));
    this.props.signup(values, callback);
  }

  onClickBack()
  {
    this.props.history.goBack();
  }
}

export default redux(Signup);