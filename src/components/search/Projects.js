import React from 'react'
import redux from 'seed/redux'
import c from 'resources/css/search/Search.module.css';
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales';

class Projects extends React.Component
{
  render()
  {
    const projects = this.state.projects ? this.state.projects : [];

    return (
      <div className={c.projects}>
        <h3 className={c.cardsTitle}>{lcs("projects")}</h3>
        {projects.map(project =>
          <div className={c.searchCard}>
            <Link to={`/app/project_profile/${project.id}`} style={{ textDecoration: "none" }}>
              <div className={c.searchCardInfo}>
                <h3 className={c.cardTitle}>{project.name}</h3>
                <p>{project.description}</p>
            </div>
            </Link>
          </div>
        )}
        {this.state.projects && projects.length == 0 ?
          <div>{lcs("no_results")}</div> : null}
      </div>
    )
  }

  constructor(props)
  {
    super(props);
    this.state = { projects: null }
  }

  componentDidMount()
  {
    const { search } = this.props.match.params;
    const callback = res =>
      this.setState(s => ({ projects: res.body }));
    this.props.getProjectList({
      "name.icontains": search,
      "is_active": true
    }, callback);
  }
}

export default redux(Projects);
