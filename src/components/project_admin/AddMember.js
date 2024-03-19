import * as React from 'react';
import * as Util from 'seed/util'
import redux from 'seed/redux';
import cx from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';
import { lcs, lc } from "components/util/Locales"
import { Formik, Field } from "formik";

import c from 'resources/css/project_admin/AddMember.module.css'


class AddMember extends React.Component
{
  render()
  {

    const { member_type } = this.props.match.params
    let title = lcs("add_member");
    if (member_type == "mentor") title = lcs("add_mentor");
    if (member_type == "instructor") title = lcs("add_instructor");

    return (
      <div className={c.module}>
        <div className={c.header}>
          {title}
        </div>
        <div className={c.content}>
          {this.state.loading ?
            <CircularProgress className={c.loading} size="20" /> : null
          }
          <Formik
            onSubmit={this.onSubmit}
            render={props => (
              <form onSubmit={props.handleSubmit}>
                <Field
                  type="email" name="email"
                  placeholder={lcs("email")}
                  className={cx("form-control", c.input)} required
                />
                {this.state.error ?
                  <div className={c.error + ' animated fadeIn'}><div> {this.state.error}</div></div> : null}
                <button type="submit" className={c.call}>{lcs("add")}</button>
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
    this.state = {}
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values)
  {
    values.lang = lcs.lang;
    const cohortId = localStorage.getItem('cohortId') != 0 ? localStorage.getItem('cohortId') : null
    const { member_type, project_id } = this.props.match.params
    const callback = res =>
    {
      this.setState(s => ({ loading: false }));
      this.props.onClose();
      if (member_type == "member" || member_type == "mentor")
        this.props.setProject(project_id, {})
      if (member_type == "instructor")
        this.props.setCohort(cohortId, {})
    }
    this.setState(s => ({ loading: true }));

    const userId = sessionStorage.getItem('id');
    if (member_type == "member")
      this.props.inviteProject(userId, project_id, [values.email], [], callback)
    if (member_type == "mentor")
      this.props.inviteProject(userId, project_id, [], [values.email], callback)
    if (member_type == "instructor")
      this.props.inviteCohort(userId, cohortId, [], [values.email], callback)
    if (member_type == "iadmin")
      this.props.inviteCohort(userId, cohortId, [values.email], [], callback)

  }
}

export default redux(AddMember);