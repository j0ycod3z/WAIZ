import React, { Component } from "react";
import redux from "seed/redux";
import { Formik, Field } from 'formik';
import { lcs } from 'components/util/Locales';

import cx from "classnames";

import "resources/bootstrap.min.module.css";
import c from "resources/css/users/Profile.module.css";

class Settings extends Component
{
  render()
  {
    const user = this.state.user;

    if (user == null) return <div></div>

    return (
      <div className={c.module}>
        <div className={"container"}>
          <div
            className={cx(
              "row",
              c.spacingContainer,
              "justify-content-md-center"
            )}
          >
            <div
              className={cx("col-sm-12", "col-md-12", "col-lg-10", "col-xl-10")}
            >
              <div className={cx("card", c.card)}>
                <div className={cx("card-body")}>
                  <h2>{lcs("settings")} </h2>
                  <br />
                  <Formik
                    initialValues={user}
                    onSubmit={this.onSubmitLanguage}
                    render={props => (
                      <form onSubmit={props.handleSubmit}>
                        <h5>{lcs("set_language")}</h5>
                        <div className={cx("form-group")}>
                          <label for="company">{lcs("language")}</label>
                          <Field component="select"
                            name="lang"
                            className={cx("form-control", c.input)}
                          >
                            <option value="EN">English</option>
                            <option value="ES">Spanish</option>
                          </Field>
                        </div>


                        <div>

                          <button
                            className={cx(
                              "btn",
                              "btn-md",
                              "btn-secondary",
                              c.buttonGreen
                            )}
                            type="submit"
                          >
                            {lcs("change_language")}
                          </button>

                        </div>
                      </form>
                    )}
                  />

                  <br />
                  <hr />
                  <br />

                  <Formik
                    onSubmit={this.onChangePassword}
                    render={props => (
                      <form onSubmit={props.handleSubmit}>
                        <h5>{lcs("change_password")}</h5>
                        <div className={cx("form-group")}>
                          <label for="country">{lcs("new_password")}</label>
                          <input
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="new_password"
                            className={cx("form-control", c.input)}
                          />
                        </div>
                        <div className={cx("form-group")}>
                          <label for="region">{lcs("repeat_new_password")}</label>
                          <input
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            name="new_password2"
                            className={cx("form-control", c.input)}
                          />
                        </div>

                        <div>

                          {this.state.error && !this.state.done ?
                            <div className={c.error + ' animated fadeIn'}><div> {this.state.error}</div></div> : null}
                          {this.state.done ?
                            <div className={c.done + ' animated fadeIn'}><div> {this.state.done}</div></div> : null}

                          <button
                            className={cx(
                              "btn",
                              "btn-md",
                              "btn-secondary",
                              c.buttonGreen
                            )}
                            type="submit"
                          >
                            {lcs("change_password")}
                          </button>

                        </div>
                      </form>
                    )}
                  />

                  <br />
                  <hr />
                  <br />

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
    this.state = {};
    this.onSubmitLanguage = this.onSubmitLanguage.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    const callback = res => this.setState(s => ({ user: res.body }))
    this.props.getUserDetails(userId, callback)
  }

  onSubmitLanguage(values, actions)
  {
    const userId = sessionStorage.getItem('id');
    sessionStorage.setItem('lang', values.lang);
    this.props.setUser(userId, { lang: values.lang })
  }

  onChangePassword(values)
  {
    const user = this.state.user;
    if (values.new_password != values.new_password2) {
      this.setState(s => ({ error: lcs("password_error") }));
    }
    const body = {
      password: values.new_password,
      token: user.verification_token
    }
    const callback = res =>
    {
      if (res.ok)
        this.setState(s => ({
          done: lcs("password_done")
        }));
      else this.setState(s => ({
        error: res.body.status == 404 ?
          lcs("unregistered_user") :
          lcs("an_error_has_ocurred")
      }));
      this.setState(s => ({ loading: false }));
    }
    this.props.changePassword(body, callback)
  }
}

export default redux(Settings);
