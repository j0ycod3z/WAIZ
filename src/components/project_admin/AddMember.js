import { useState } from 'react';
import redux from 'seed/redux';
import cx from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import { lcs } from "components/util/Locales"
import { Formik, Field } from "formik";

import c from 'components/project_admin/AddMember.module.scss'

function AddMember(props) {
  const { match, onClose, setProject, setCohort, inviteProject, inviteCohort } = props;
  const { member_type, project_id } = match.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  let title = lcs("add_member");
  if (member_type === "mentor") title = lcs("add_mentor");
  if (member_type === "instructor") title = lcs("add_instructor");
  
  const onSubmit = (values) => {
    values.lang = lcs.lang;
    const cohortId = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : null;

    const callback = () => {
      setLoading(false);
      onClose();
      
      if (member_type === "member" || member_type === "mentor")
        setProject(project_id, {});
      if (member_type === "instructor")
        setCohort(cohortId, {});
    };

    setLoading(true);
    const userId = sessionStorage.getItem('id');

    if (member_type === "member")
      inviteProject(userId, project_id, [values.email], [], callback);
    if (member_type === "mentor")
      inviteProject(userId, project_id, [], [values.email], callback);
    if (member_type === "instructor")
      inviteCohort(userId, cohortId, [], [values.email], callback);
    if (member_type === "iadmin")
      inviteCohort(userId, cohortId, [values.email], [], callback);
  };

  return (
    <div className={c.module}>
      <div className={c.header}>{title}</div>
      <div className={c.content}>
        {loading &&
          <CircularProgress className={c.loading} size="20" />
        }
        <Formik
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field
                type="email"
                name="email"
                placeholder={lcs("email")}
                className={cx("form-control", c.input)}
                required
              />
              {error &&
                <div className={c.error}>
                  <div>{error}</div>
                </div>
              }
              <button type="submit" className={c.call}>{lcs("add")}</button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default redux(AddMember);