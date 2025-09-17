import React, { useState, useEffect } from 'react'
import redux from 'seed/redux'
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales';

import c from 'components/search/Search.module.scss';

function Projects(props) {
  const { match, getProjectList } = props;

  const [projects, setProjects] = useState(null);

  const safeProjects = projects ? projects : [];

  useEffect(() => {
    getProjectList({
      "name.icontains": match.params.search,
      "is_active": true
    }, (res) => setProjects(res.body));
  }, [match.params.search, getProjectList]);

  return (
    <>
      <h4>{lcs("projects")}</h4>
      <div className={c.resultsList}>
        {safeProjects.map((project) => (
          <div key={project.id} className={c.searchCard}>
            <Link to={`/app/project_profile/${project.id}`}>
              <h3 className={c.cardTitle}>{project.name}</h3>
              <p>{project.description}</p>
            </Link>
          </div>
        ))}
        {(projects && safeProjects.length === 0) &&
          <div>{lcs("no_results")}</div>
        }
      </div>
    </>
  )
}

export default redux(Projects);