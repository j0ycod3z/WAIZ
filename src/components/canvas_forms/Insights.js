import * as React from 'react';
import redux from 'seed/redux';

import List from 'components/canvas_forms/insights/List'
import { lcs, lc } from "components/util/Locales"

import c from 'resources/css/canvas_forms/Insights.module.css'

class Insights extends React.Component
{
  render()
  {
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases } = this.props;
    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let projectId = canvas ? canvas.project_id : 0
    const insights = this.props.insights.filter(
      insight => insight.area_id == area_id && insight.project_id == projectId);

    return (
      <div className={c.module}>
        <div className={c.listContainer}>
          <List
            insightsD={insights}
            onDelete={this.onDelete} />
        </div>
        <div className={c.formContainer}>
          <form onSubmit={this.onSubmit}>
            <textarea name="text" placeholder={lcs("describe_your_insight")} required />
            <select name="type" required>
              <option value="MUST_HAVE">{lcs("must_have")}</option>
              <option value="NICE_TO_HAVE">{lcs("nice_to_have")}</option>
              <option value="INVALIDATE_HYPOTHESIS">{lcs("invalidate_hypothesis")}</option>
            </select>
            <button type="submit" className={c.call}>{lcs("save")}</button>
          </form>
        </div>
      </div>
    );
  }


  constructor(props)
  {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount()
  {
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases } = this.props;
    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let projectId = canvas ? canvas.project_id : 0
    this.props.getInsightList({ area: area_id, project: projectId });
  }

  onSubmit = e =>
  {
    e.preventDefault();
    const { area_id, canvas_id } = this.props.match.params;
    const { canvases } = this.props;
    let text = e.target.text.value;
    let type = e.target.type.value;
    let canvas = canvases.filter(canvas => canvas.id == canvas_id)[0];
    let projectId = canvas ? canvas.project_id : 0
    const comment = {
      text: text,
      type: type,
      area_id: area_id,
      interview_id: null,
      hypothesis_id: null,
      project_id: projectId,
      creator_id: sessionStorage.getItem('id')
    }
    e.currentTarget.reset();
    this.props.saveInsight(comment);
  }

  onDelete = e =>
  {
    const insightId = e.currentTarget.title;
    this.props.deleteInsight(insightId);
  }
}

export default redux(Insights);