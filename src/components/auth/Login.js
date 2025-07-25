import React from 'react';
import { useState } from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { Link } from 'react-router-dom';
import waizLogo from 'resources/images/waiz_logo_white.svg';

import c from 'resources/css/auth/Login.module.css';

function Login(props) {
  const [state, setState] = useState({});

  const onLogin = (e) => {
    e.preventDefault();
    let { action } = props.match.params;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let rememberMe = e.target.rememberMe.checked;

    let callback = (res) => {
      if (res.ok) {
        let token = res.body.key;
        let userId = res.body.user;

        props.getUserDetails(userId, (resU) => {
          if (resU.body.missing_payment) {
            sessionStorage.clear();
            localStorage.clear();
            
            return setState((s) => ({
              missingPayment: true,
              error: undefined
            }));
          }
          if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("id", userId);
          }
          if (action === "welcome") props.history.replace("/projects/new")
          else props.history.replace('/');
        })
      } else setState((s) => ({
        missingPayment: undefined,
        error: lcs("invalid_user_or_password")
      }));
    }
    props.login(email, password, callback);
  }

  const { error, missingPayment } = state;

  const paymentMessage = missingPayment ? (
    <div className={c.payment + ' animated fadeIn'}>
      <div>
        {lcs("missing_payment_message")} <a href="mailto:hello@waiz.ai">hello@waiz.ai</a> {lcs("missing_payment_message_2")}
        </div>
      </div>
    ) : null;

  const errorMessage = error ? (
    <div className={c.error + ' animated fadeIn'}>
      <div>{error}</div>
    </div>
  ) : null;

  return (
    <div className={c.background}>
      <div className={c.module}>
        <div className={c.container}>
          <div>
            <img
              className={c.logoCanou}
              alt="Logo"
              src={waizLogo}
            />
          </div>

          <div className={cx("row", "d-flex", "justify-content-center", c.rowCompleteHeight)}>
            <div className={cx(c.columnCenter, "col-md-8", "col-lg-5")}>
              <div className={cx("card", c.card)}> {/*, 'animated zoomIn'*/}
                <div className={cx("row", "d-flex", "justify-content-center")}>
                  <h1 className={c.title}>{lcs("login")}</h1>
                </div>

                <form onSubmit={onLogin}>
                  <div className={cx("form-group")}>
                    <input
                      type="email"
                      name="email"
                      className={cx("form-control", c.txtField)}
                      placeholder="Email"
                      required
                      // placeholder="email@example.com"
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <input
                      type="password"
                      name="password"
                      className={cx("form-control", c.txtField)}
                      placeholder="Password"
                      required
                      // placeholder={lcs("enter_your_password")}
                    />
                  </div>
                  <div className={cx("form-group", c.optionsContainer)}>
                    <div className="row">
                      <div className="col">
                        <div className={cx("form-group")}>
                          <div className={cx("form-check", c.checkboxContainer)}>
                            <label
                              className={cx("form-check-label", c.checkboxItem)}
                              htmlFor="rememberMe">
                              {lcs("remember_me")}
                            </label>
                            <input
                              type="checkbox"
                              name="rememberMe"
                              className={cx("form-check-input", c.checkboxItem)}
                              id="rememberMe"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <p className={cx("text-right", c.signin)}>
                          {lcs("dont_have_an_account")}&nbsp;
                          <Link to="/signup">{lcs("sign_up")}</Link>
                        </p>
                        <p className="text-right">
                          <Link to="/recovery">{lcs("forgot_your_password")}</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  {paymentMessage}
                  {errorMessage}
                  <button className={cx("btn", "btn-block", "btn-large", c.loginButton, c.buttonGreen, c.mainButton)}>
                    {lcs("login")}
                  </button>
                </form>
              </div>

              <div className={cx("row", "d-flex", "justify-content-center")}>
                <div className={cx("d-flex", "align-items-end")}>
                  <p className={cx(c.footer)}>wAIz ©</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(Login);
