import React, { useState, useEffect } from "react";
import redux from "seed/redux";
import { Formik, Field } from 'formik';
import { lcs } from 'components/util/Locales';

import cx from "classnames";

import c from "components/users/Profile.module.scss";

function Settings(props) {
  const { getUserDetails, setUser, changePassword } = props;

  const [user, setUserState] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem("id");
    getUserDetails(userId, (res) => setUserState(res.body));
  }, [getUserDetails]);

  const onSubmitLanguage = (values) => {
    const userId = sessionStorage.getItem("id");
    sessionStorage.setItem("lang", values.lang);
    setUser(userId, { lang: values.lang });
  };

  const onChangePassword = (values) => {
    if (values.new_password != values.new_password2) {
      setError(lcs("password_error"));
      return;
    }

    const body = {
      password: values.new_password,
      token: user.verification_token,
    };

    setLoading(true);
    changePassword(body, (res) => {
      if (res.ok) {
        setDone(lcs("password_done"));
      } else {
        setError(
          res.body.status == 404
            ? lcs("unregistered_user")
            : lcs("an_error_has_ocurred")
        );
      }
      setLoading(false);
    });
  };
  
  if (user == null) return <></>;
  
  return (
    <div className={c.module}>
      <div className={"container"}>
        <div className={cx("row", c.spacingContainer, "justify-content-md-center")}>
          <div className={cx("col-md-12")}>
            <div className={cx(c.card)}>
              <div className={cx("card-body")}>
                <h2>{lcs("settings")}</h2>
                <Formik
                  initialValues={user}
                  onSubmit={onSubmitLanguage}
                  render={formProps => (
                    <form onSubmit={formProps.handleSubmit}>
                      <h5>{lcs("set_language")}</h5>
                      <div className={cx("form-group")}>
                        <Field component="select" name="lang" className={cx("form-control", c.input)}>
                          <option value="EN">English</option>
                          <option value="ES">Spanish</option>
                        </Field>
                      </div>
                      <div>
                        <button className={cx("btn", "btn-md", "btn-secondary", c.buttonGreen)} type="submit">
                          {lcs("change_language")}
                        </button>
                      </div>
                    </form>
                  )}
                />
                <hr />
                <Formik
                  onSubmit={onChangePassword}
                  render={formProps => (
                    <form onSubmit={formProps.handleSubmit}>
                      <h5>{lcs("change_password")}</h5>
                      <div className={cx("form-group")}>
                        <label htmlFor="new_password">{lcs("new_password")}</label>
                        <input
                          type="password"
                          onChange={formProps.handleChange}
                          onBlur={formProps.handleBlur}
                          name="new_password"
                          id="new_password"
                          className={cx("form-control", c.input)}
                        />
                      </div>
                      <div className={cx("form-group")}>
                        <label htmlFor="new_password2">{lcs("repeat_new_password")}</label>
                        <input
                          type="password"
                          onChange={formProps.handleChange}
                          onBlur={formProps.handleBlur}
                          name="new_password2"
                          id="new_password2"
                          className={cx("form-control", c.input)}
                        />
                      </div>
                      <div>
                        {(error && !done) &&
                          <div className={cx(c.error, 'animated fadeIn')}>{error}</div>
                        }
                        {done &&
                          <div className={cx(c.done, 'animated fadeIn')}>{done}</div>
                        }
                        <button className={cx("btn", "btn-md", "btn-secondary", c.buttonGreen)} type="submit">
                          {lcs("change_password")}
                        </button>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(Settings);