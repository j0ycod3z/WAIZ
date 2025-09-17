import React from "react";
import redux from 'seed/redux';

import cx from "classnames";
import { lcs } from 'components/util/Locales';

import { Formik } from "formik";
import c from "components/project_admin/registry/Registry.module.scss";

function Registry(props) {
  const { registerProject, history, match } = props;
  const { url } = match;

  const onSubmit = (values) => {
    const userId = sessionStorage.getItem('id');
    let cohortId = localStorage.getItem('cohortId');

    if (cohortId === null || cohortId === undefined) cohortId = 0;
    if (values.description === null || values.description === undefined || values.description === "") {
      values.description = "-";
    }
    
    registerProject(userId, values.name, values.description, cohortId, (res) => {
      if (res.ok) {
        history.replace(`${url}/${res.body.id}/members`);
      }
    });
  };

  return (
    <div className={cx(c.module)}>
      <h1 className={c.title}>{lcs("create_a_project")}</h1>
      <Formik
        onSubmit={onSubmit}
        render={({ handleSubmit, handleChange, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                required={true}
                placeholder={lcs("project_name")}
                className={cx("form-control", c.input)}
              />
            </div>
            <div className={cx("form-group")}>
              <textarea
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                placeholder={lcs("description")}
                className={cx("form-control", c.input)}
              />
            </div>
            <div>
              <button
                className={cx(c.buttonGreen, c.mainButton, c.save)}
                type="submit"
              >
                {lcs("next")}
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default redux(Registry);