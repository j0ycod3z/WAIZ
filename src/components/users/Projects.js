import React, { Component } from "react";
import cx from "classnames";
import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales';

import "react-bootstrap";
import c from "resources/css/users/Profile.module.css";

class Projects extends Component
{
  render()
  {
    const userId = parseInt(this.props.userId);
    const projects = this.props.projects.filter(p =>
      p.admin_id == userId || p.mentor_ids.includes(userId) || p.member_ids.includes(userId));

    const projectList = projects.map(p =>
    {
      const description = p.description.length > 100 ? p.description.substring(0, 100) + "…" : p.description;
      return (
        <div key={p.id} className={c.element}>
          <Link to={`/app/project_profile/${p.id}`} className={c.link}>
            {p.name}
            <p style={{ color: "#777" }}>{description}</p>
          </Link>
        </div>);
    })

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>

          <div className={cx(c.marginTop, c.paddingBottom)}>
            <h5 className={cx("card-title", c.cardTitle)}>{lcs("projects")}</h5>
            <div className={c.bigList}>
              {projectList}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Projects;
