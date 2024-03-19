import React from 'react'
import redux from 'seed/redux'
import * as Util from 'seed/util'
import c from 'resources/css/search/Search.module.css';
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales';

class Projects extends React.Component
{
  render()
  {
    const hypotheses = this.state.hypotheses ? this.state.hypotheses : [];
    const canvases = this.state.canvases;
    let projectId = localStorage.getItem('projectId');
    const project = Util.get(this.props.projects, projectId);

    return (
      <div className={c.projects}>
        <h3 className={c.cardsTitle}>{project.name} / {lcs("hypotheses")}</h3>
        {hypotheses.map(hypothesis =>
        {
          let canvas = canvases.filter(canvas => hypothesis.canvas_id == canvas.id)[0];
          let area = canvas ? canvas.type.areas.filter(a => hypothesis.area_id == a.id)[0] : null;
          return (
            <div className={c.searchCard}>
              <Link to={`/app/c/${hypothesis.canvas_id}/area/${hypothesis.area_id}/help`} style={{ textDecoration: "none" }}>
                <div className={c.searchCardInfo}>
                  <h3 className={c.cardTitle}>{hypothesis.text}</h3>
                  <p>{hypothesis.description}</p>
                  <div className={c.compoundSubtitle}>
                    <div className={c.ring}></div>
                    <h4 className={c.subtitle}>{canvas ? lc(canvas.type.l_name) : ""} > {area ? lc(area.l_name) : ""}</h4>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        {this.state.hypotheses && hypotheses.length == 0 ?
          <div>{lcs("no_results")}</div> : null}
      </div>
    )
  }

  constructor(props)
  {
    super(props);
    this.state = { hypotheses: null, canvases: [] }
  }

  componentDidMount()
  {
    const { search } = this.props.match.params;
    let projectId = localStorage.getItem('projectId');
    const callback = res =>
      this.setState(s => ({ hypotheses: res.body }));
    this.props.getHypothesisList({
      "text.icontains": search,
      "canvas.project_id": projectId,
      "is_active": true
    }, callback);

    const callback1 = res =>
      this.setState(s => ({ canvases: res.body }));
    this.props.getCanvasList({
      "project_id": projectId
    }, callback1);
    this.props.getProjectDetailList({ project: projectId });
  }
}

export default redux(Projects);
