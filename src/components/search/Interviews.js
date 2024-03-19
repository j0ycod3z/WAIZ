import React from 'react'
import redux from 'seed/redux'
import * as Util from 'seed/util'
import c from 'resources/css/search/Search.module.css';
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales';

class Projects extends React.Component
{
  render()
  {
    const interviews = this.state.interviews ? this.state.interviews : [];
    let projectId = localStorage.getItem('projectId');
    const project = Util.get(this.props.projects, projectId);
    return (
      <div className={c.projects}>
        <h3 className={c.cardsTitle}>{project.name} /  {lcs("interviews")}</h3>
        {interviews.map(interview =>
          <div className={c.searchCard}>
            <Link to={`/app/interviews/${projectId}/${interview.id}`} style={{ textDecoration: "none" }}>
              <div className={c.searchCardInfo}>
                <h3 className={c.cardTitle}>{interview.interviewee_name}</h3>
                <div className={c.compoundSubtitle}>
                  <div className={c.ring}></div>
                  <h4 className={c.subtitle}>{interview.project.name}</h4>
                </div>
                <p>{interview.transcript}</p>
              </div>
            </Link>
          </div>
        )}
        {this.state.interviews && interviews.length == 0 ?
          <div>{lcs("no_results")}</div> : null}
      </div>
    )
  }

  constructor(props)
  {
    super(props);
    this.state = { interviews: null }
  }

  componentDidMount()
  {
    const { search } = this.props.match.params;
    let projectId = localStorage.getItem('projectId');
    const callback = res =>
      this.setState(s => ({ interviews: res.body }));
    this.props.getInterviewList({
      "transcript.icontains": search,
      "project_id": projectId
    }, callback);
    this.props.getProjectDetailList({ project: projectId });
  }
}

export default redux(Projects);
