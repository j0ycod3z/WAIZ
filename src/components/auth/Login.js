import * as React from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'
import { Link } from 'react-router-dom'

import c from 'resources/css/auth/Login.module.css';

class Login extends React.Component {
  render() {
    const { error, missingPayment } = this.state;

    const paymentMessage =
      missingPayment ? <div className={c.payment + ' animated fadeIn'}><div> {lcs("missing_payment_message")} <a href="mailto:hello@waiz.ai">hello@waiz.ai</a> {lcs("missing_payment_message_2")}</div></div> : null;

    const errorMessage =
      error ? <div className={c.error + ' animated fadeIn'}><div> {error}</div></div> : null;

    return (
      <div className={c.background} style={{ background: "url(" + require("resources/images/wave.svg") + ") no-repeat center center", backgroundColor: "#29244e" }}>
        <div className={c.module}>
          <div className={c.container}>
            <div>
              <img className={c.logoCanou} alt="Logo"
                src={require("resources/images/waiz_logo_white.svg")} />
            </div>

            <div className={cx("row", "d-flex", "justify-content-center", c.rowCompleteHeight)}>
              <div className={cx(c.columnCenter, "col-md-8", "col-lg-5")}>
                <div className={cx("card", c.card, 'animated zoomIn')}>
                  <div className={cx("card-body")}>
                    <div className={cx("row", "d-flex", "justify-content-center")}>
                      <h1 className={c.title}>{lcs("login")}</h1>
                    </div>

                    <form onSubmit={this.onLogin}>
                      <div className={cx("form-group")}>
                        <label htmlFor="email" className={c.txtLabel}>{lcs("email")}</label>
                        <input
                          type="email"
                          name="email"
                          className={cx("form-control", c.txtField)}
                          placeholder="email@example.com" />
                      </div>
                      <div className={cx("form-group")}>
                        <label htmlFor="password" className={c.txtLabel}>{lcs("password")}</label>
                        <input
                          type="password"
                          name="password"
                          className={cx("form-control", c.txtField)}
                          placeholder={lcs("enter_your_password")} />
                      </div>
                      <div className={cx("form-group", c.optionsContainer)}>
                        <div className={"row"}>
                          <div className={"col"}>
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
                                  id="rememberMe" />
                              </div>
                            </div>
                          </div>
                          <div className={"col"}>
                            <p className={cx("text-right", c.signin)}>
                              {lcs("dont_have_an_account")}&nbsp;
                              <Link to="/signup">
                                {lcs("sign_up")}
                              </Link>
                            </p>
                            <p className={"text-right"}>
                              <Link to="/recovery">
                                {lcs("forgot_your_password")}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                      {paymentMessage}
                      {errorMessage}
                      <button className={cx("btn", "btn-block", "btn-large", c.loginButton)}>
                        {lcs("login")}
                      </button>
                    </form>
                  </div>
                </div>

                <div className={cx("row", "d-flex", "justify-content-center")}>
                  <div className={cx("d-flex", "align-items-end")}>
                    <p className={cx(c.footer)}>
<<<<<<< HEAD
                       wAIz © {/*| <a href="https://canou-media.s3-us-west-1.amazonaws.com/static/Te%CC%81rminos+y+condiciones+y+aviso+de+provacidad.pdf">{lcs("terms_and_conditions")}</a> */}
=======
                      wAIz © 
>>>>>>> 3ceb824014113db2919fd6605afa0f833af12a98
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }


  constructor(props) {
    super(props);
    this.state = {}
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin = e => {
    e.preventDefault();
    let { action } = this.props.match.params;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let rememberMe = e.target.rememberMe.checked;

    let callback = res => {
      if (res.ok) {
        let token = res.body.key;
        let userId = res.body.user;
        this.props.getUserDetails(res.body.user, resU => {
          if (resU.body.missing_payment) {
            sessionStorage.clear();
            localStorage.clear();
            return this.setState(s => ({
              missingPayment: true,
              error: undefined
            }));
          }
          if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("id", userId);
          }
          if (action == "welcome") this.props.history.replace("/projects/new")
          else this.props.history.replace('/');
        })
      } else this.setState(s => ({
        missingPayment: undefined,
        error: lcs("invalid_user_or_password")
      }));
    }
    this.props.login(email, password, callback);
  }
}

export default redux(Login);
