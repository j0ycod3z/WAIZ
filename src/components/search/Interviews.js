import React, { useState, useEffect } from 'react'
import redux from 'seed/redux'
import * as Util from 'seed/util'
import { Link } from 'react-router-dom'
import { lcs } from 'components/util/Locales';

import c from 'components/search/Search.module.scss';

function Projects(props) {
  const { projects, match, getInterviewList, getProjectDetailList } = props;

  const [interviews, setInterviews] = useState(null);

  const projectId = localStorage.getItem('projectId');
  const project = Util.get(projects, projectId);
  const safeInterviews = interviews || [];

  useEffect(() => {
    getInterviewList({
      "transcript.icontains": match.params.search,
      "project_id": projectId
    }, (res) => setInterviews(res.body));

    getProjectDetailList({ project: projectId });
  }, [match.params.search, getInterviewList, getProjectDetailList]);
  
  return (
    <>
      <h4>{`${project.name} / ${lcs("interviews")}`}</h4>
      <div className={c.resultsList}>
        {safeInterviews.map((interview) => (
          <div key={interview.id} className={c.searchCard}>
            <Link to={`/app/interviews/${projectId}/${interview.id}`}>
              <h3 className={c.cardTitle}>{interview.interviewee_name}</h3>
              <div className={c.compoundSubtitle}>
                <div className={c.ring} />
                <p className={c.subtitle}>{interview.project.name}</p>
              </div>
              <p>{interview.transcript}</p>
            </Link>
          </div>
        ))}
        {(interviews && safeInterviews.length === 0) &&
          <div>{lcs("no_results")}</div>
        }
      </div>
    </>
  )
}

export default redux(Projects);