import React, { useMemo } from "react";
import cx from "classnames";
import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales';

import c from "components/users/Profile.module.scss";

function Projects(props) {
  const { userId, projects } = props;

  const numericUserId = parseInt(userId, 10);

  const filteredProjects = useMemo(() => 
    projects.filter((p) =>
      p.admin_id === numericUserId || p.mentor_ids.includes(numericUserId) || p.member_ids.includes(numericUserId)
    ), [projects, numericUserId]
  );
  
  return (
    <div className={cx(c.card)}>
      <div className={cx("card-body")}>
        <h5 className={cx("card-title", c.cardTitle)}>{lcs("projects")}</h5>
        <div className={c.bigList}>
          {filteredProjects.map((p) => {
            const description = p.description.length > 100 ? p.description.substring(0, 100) + "…" : p.description;
            return (
              <div key={p.id} className={c.element}>
                <Link to={`/app/project_profile/${p.id}`} className={c.link}>
                  <span>{p.name}</span>
                  <p style={{ color: "#777" }}>{description}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;