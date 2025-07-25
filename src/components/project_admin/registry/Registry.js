import React, { Component } from "react";
import redux from 'seed/redux';

import cx from "classnames";
import { lcs } from 'components/util/Locales';

import "react-bootstrap";
import { Formik } from "formik";
import c from "resources/css/project_admin/registry/Registry.module.css";

class Registry extends Component
{
  render()
  {
    return (
      <div>
        <div className={cx(c.module, "animated fadeInUp")}>
          <h1 className={c.title}>{lcs("create_a_project")}</h1>
          <Formik
            onSubmit={this.onSubmit}
            render={props => (
              <form onSubmit={props.handleSubmit}>

                <div className={cx("form-group")}>
                  <label for="name">{lcs("project_name")}</label>
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name="name"
                    required={true}
                    placeholder={lcs("write_the_project_name")}
                    className={cx("form-control", c.input)}
                  />
                </div>
                <div className={cx("form-group")}>
                  <label for="name">{lcs("description")} ({lcs("optional")})</label>
                  <textarea
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name="description"
                    placeholder={lcs("write_brief_description")}
                    className={cx("form-control", c.input)}
                  />
                </div>
                <div>
                  <button
                    className={cx(
                      "btn",
                      "btn-md",
                      c.buttonGreen,
                      c.mainButton,
                      c.save
                    )}
                    type="submit">
                    {lcs("next")}
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values)
  {
    const { url } = this.props.match;
    const callback = res =>
    {
      if (res.ok)
        this.props.history.replace(`${url}/${res.body.id}/members`);
    }
    const userId = sessionStorage.getItem('id');
    let cohortId = localStorage.getItem('cohortId');
    if (cohortId == null) cohortId = 0;
    if (values.description == null || values.description == "")
      values.description = "-";
    this.props.registerProject(userId, values.name, values.description, cohortId, callback)

  }
}

export default redux(Registry);
