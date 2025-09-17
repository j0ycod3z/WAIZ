import React, { useState, useEffect } from 'react'
import redux from 'seed/redux'
import * as Util from 'seed/util'
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales';

import c from 'components/search/Search.module.scss';

function Projects(props) {
  const { projects, match, getHypothesisList, getCanvasList, getProjectDetailList } = props;

  const [hypotheses, setHypotheses] = useState(null);
  const [canvases, setCanvases] = useState([]);

  const projectId = localStorage.getItem('projectId');
  const project = Util.get(projects, projectId);
  const safeHypotheses = hypotheses || [];
  
  useEffect(() => {
    getHypothesisList({
      "text.icontains": match.params.search,
      "canvas.project_id": projectId,
      "is_active": true
    }, (res) => setHypotheses(res.body));

    getCanvasList({ "project_id": projectId }, (res) => setCanvases(res.body));

    getProjectDetailList({ project: projectId });
  }, [match.params.search, getHypothesisList, getCanvasList, getProjectDetailList]);

  return (
    <>
      <h4>{`${project.name} / ${lcs("hypotheses")}`}</h4>
      <div className={c.resultsList}>
        {safeHypotheses.map((hypothesis) => {
          const canvas = canvases.find((canvas) => hypothesis.canvas_id === canvas.id);
          const area = canvas?.type?.areas.find((a) => hypothesis.area_id === a.id);

          return (
            <div key={hypothesis.id} className={c.searchCard}>
              <Link to={`/app/c/${hypothesis.canvas_id}/area/${hypothesis.area_id}/help`} >
                <h3 className={c.cardTitle}>{hypothesis.text}</h3>
                {hypothesis.description &&
                  <p>{hypothesis.description}</p>
                }
                <div className={c.compoundSubtitle}>
                  <div className={c.ring} />
                  <p className={c.subtitle}>{`${canvas ? lc(canvas.type.l_name) : ""} > ${area ? lc(area.l_name) : ""}`}</p>
                </div>
              </Link>
            </div>
          )
        })}
        {(hypotheses && safeHypotheses.length === 0) &&
          <div>{lcs("no_results")}</div>
        }
      </div>
    </>
  )
}

export default redux(Projects);