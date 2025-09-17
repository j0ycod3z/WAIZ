import { useState } from "react";
import redux from 'seed/redux';
import { Formik, Form, Field, FieldArray } from "formik";
import { lcs } from 'components/util/Locales';
import cx from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import c from "components/project_admin/registry/Invites.module.scss";

function AddMembers(props) {
  const { match, history, inviteProject } = props;
  const { project_id } = match.params;
  
  const [loading, setLoading] = useState(false);

  const onSubmit = (values) => {
    const members = values.members.filter((m) => m !== "");
    const mentors = values.mentors.filter((m) => m !== "");

    setLoading(true);
    const userId = sessionStorage.getItem('id');

    inviteProject(userId, project_id, members, mentors, (res) => {
      if (res.ok) history.replace(`/`);
      setLoading(false);
    });
  };

  return (
    <div className={cx(c.module)}>
      <h1 className={c.title}>Team</h1>

      {loading && (
        <CircularProgress className={c.loading} size="20" />
      )}

      <Formik
        initialValues={{ members: [""], mentors: [""] }}
        onSubmit={onSubmit}
        render={({ values }) => (
          <Form>
            <h5>{lcs("members")} ({lcs("optional")})</h5>
            <FieldArray
              name="members"
              render={(arrayHelpers) => (
                <div className={cx(c.inputGroup)}>
                  {values.members.map((member, index) => (
                    <div key={index} className={cx("input-group")}>
                      <Field
                        className={cx("form-control", c.input)}
                        type="email"
                        placeholder="email@example.com"
                        name={`members.${index}`}
                      />
                      {index !== 0 && (
                        <button
                          className={cx("btn", c.btn)}
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a member from the list
                        >
                          -
                        </button>
                      )}
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
            <h5>{lcs("mentors")} ({lcs("optional")})</h5>
            <FieldArray
              name="mentors"
              render={(arrayHelpers) => (
                <div className={cx(c.inputGroup)}>
                  {values.mentors.map((mentor, index) => (
                    <div key={index} className={cx("input-group")}>
                      <Field
                        className={cx("form-control", c.input)}
                        type="email"
                        placeholder="email@example.com"
                        name={`mentors.${index}`}
                      />
                      {index !== 0 && (
                        <button
                          className={cx("btn", c.btn)}
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a mentor from the list
                        >
                          -
                        </button>
                      )}
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

export default redux(AddMembers);
