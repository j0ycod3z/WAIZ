import React, { Component } from "react";
import redux from 'seed/redux';
import { Formik, Form, Field, FieldArray } from "formik";
import { lcs } from 'components/util/Locales';
import cx from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import "resources/bootstrap.min.module.css";
import c from "resources/css/project_admin/registry/Invites.module.css";

class AddMembers extends Component
{
  render()
  {
    const { path } = this.props.match;

    return (
      <div className={cx(c.module, "animated fadeInUp")}>
        <h1 className={c.title}>Team</h1>

        {this.state.loading ?
          <CircularProgress className={c.loading} size="20" /> : null
        }

        <Formik
          initialValues={{ members: ["", "", ""], mentors: ["", "", ""] }}
          onSubmit={this.onSubmit}
          render={({ values }) => (
            <Form>
              <h5>{lcs("members")} ({lcs("optional")})</h5>
              <FieldArray
                name="members"
                render={arrayHelpers => (
                  <div>
                    {values.members.map((member, index) => (
                      <div key={index} className={cx("input-group")}>
                        <Field
                          className={cx("form-control", c.input)}
                          placeholder="email@example.com"
                          name={`members.${index}`}
                        />
                        {index !== 0 ? (
                          <span className={cx("input-group-btn")}>
                            <button
                              className={cx("btn", "btn-secondary", c.btn)}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a member from the list
                            >
                              -
                            </button>
                          </span>
                        ) : null}
                      </div>
                    ))}
                    <button
                      type="button"
                      className={cx(c.buttonLink)}
                      onClick={() => arrayHelpers.push("")}
                    >
                      {lcs("add_member")}
                    </button>
                  </div>
                )}
              />
              <br />
              <h5>{lcs("mentors")} ({lcs("optional")})</h5>
              <FieldArray
                name="mentors"
                render={arrayHelpers => (
                  <div>
                    {values.mentors.map((mentor, index) => (
                      <div key={index} className={cx("input-group")}>
                        <Field
                          className={cx("form-control", c.input)}
                          placeholder="email@example.com"
                          name={`mentors.${index}`}
                        />
                        {index !== 0 ? (
                          <span className={cx("input-group-btn")}>
                            <button
                              className={cx("btn", "btn-secondary", c.btn)}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a member from the list
                            >
                              -
                            </button>
                          </span>
                        ) : null}
                      </div>
                    ))}
                    <button
                      type="button"
                      className={cx(c.buttonLink)}
                      onClick={() => arrayHelpers.push("")}
                    >
                      {lcs("add_mentor")}
                    </button>
                  </div>
                )}
              />
              <br />
              <div>
                <button
                  className={cx(
                    "btn",
                    "btn-md",
                    c.buttonGreen,
                    c.mainButton,
                    c.save
                  )}
                  type="submit"
                >
                  {lcs("create_project")}
                  </button>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values)
  {
    const { project_id } = this.props.match.params;
    const members = values.members.filter(m => m != "");
    const mentors = values.mentors.filter(m => m != "");
    const callback = res =>
    {
      if (res.ok)
        this.props.history.replace(`/`);
      this.setState(s => ({ loading: false }));
    }
    this.setState(s => ({ loading: true }));
    const userId = sessionStorage.getItem('id');
    this.props.inviteProject(userId, project_id, members, mentors, callback)
  }
}

export default redux(AddMembers);
