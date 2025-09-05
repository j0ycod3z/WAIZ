import { useState } from 'react';
import redux from 'seed/redux';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { NavLink } from 'react-router-dom'; //import { useParams } from 'react-router-dom'; to replace
import waizLogo from 'resources/images/waiz_logo_white.svg';

import c from 'resources/css/auth/Login.module.css';

function Login(props) {
  const { match, history, getUserDetails } = props;
  const { action } = match.params; //const { action } = useParams(); to replace

  const [missingPayment, setMissingPayment] = useState(false);
  const [error, setError] = useState(undefined);

  const onLogin = (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    const rememberMe = e.target.rememberMe.checked;

    props.login(email, password, (res) => {
      if (res.ok) {
        const token = res.body.key;
        const userId = res.body.user;

        getUserDetails(userId, (resU) => {
          if (resU.body.missing_payment) {
            sessionStorage.clear();
            localStorage.clear();
            
            setMissingPayment(true);
            setError(undefined);
            return;
          }
          if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("id", userId);
          }
          if (action === "welcome")
            history.replace("/projects/new")
          else
            history.replace('/');
        })
      } else {
        setMissingPayment(false);
        setError(lcs("invalid_user_or_password"));
      }
    });
  }

  const paymentMessage = missingPayment && (
    <div className={cx(c.payment, 'animated', 'fadeIn')}>
      <div>
        {lcs("missing_payment_message")} <a href="mailto:hello@waiz.ai">hello@waiz.ai</a> {lcs("missing_payment_message_2")}
      </div>
    </div>
  );

  const errorMessage = error && (
    <div className={cx(c.error,'animated', 'fadeIn')}>
      <div>{error}</div>
    </div>
  );

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
                          <NavLink to="/signup">{lcs("sign_up")}</NavLink>
                        </p>
                        <p className="text-right">
                          <NavLink to="/recovery">{lcs("forgot_your_password")}</NavLink>
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
