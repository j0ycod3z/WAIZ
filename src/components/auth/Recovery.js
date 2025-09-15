import { useState } from "react";
import cx from "classnames";
import redux from 'seed/redux'
import { lcs } from 'components/util/Locales';
import { Formik, Field } from "formik";
import CircularProgress from '@material-ui/core/CircularProgress';
import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

import c from "resources/css/auth/Recovery.module.css";

function Recovery(props) {
  const { history, recoverPassword } = props;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (values) => {
    const body = { email: values.email };

    setLoading(true);
    recoverPassword(body, (res) => {
      if (res.ok)
        history.replace(`/recovery_message/request`);
      else {
        setError(
          res.body.status === 404
            ? lcs("unregistered_user")
            : lcs("an_error_has_ocurred")
        );
      }
      setLoading(false);
    });
  }

  const onClickBack = () => {
    history.goBack();
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

            {loading &&
              <CircularProgress className={c.loading} size="20" />
            }

            <Formik
              initialValues={{ email: "" }}
              onSubmit={onSubmit}
              render={(formikProps) => (
                <form onSubmit={formikProps.handleSubmit}>
                  <div className={cx("form-group")}>
                    <label htmlFor="email">{lcs("recovery_notice")}</label>
                    <Field
                      type="email"
                      name="email"
                      className={cx("form-control", c.input)}
                      required
                    />
                  </div>
                  {error &&
                    <div className={cx(c.error, 'animated', 'fadeIn')}>
                      <div> {error}</div>
                    </div>
                  }
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