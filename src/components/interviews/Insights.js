import * as React from 'react';
import redux from 'seed/redux';

import List from 'components/interviews/insights/List'
import { lcs, lc } from "components/util/Locales"

import c from 'resources/css/interviews/Insights.module.css'

class Insights extends React.Component
{
  render()
  {
    const { interviewId } = this.props;
    const insights = this.props.insights.filter(i => i.interview_id != null && i.interview_id == interviewId);

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
    this.props.getInsightList({ interview: this.props.interviewId });
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.interviewId !== this.props.interviewId)
      this.props.getInsightList({ interview: nextProps.interviewId });
  }



  onSubmit = e =>
  {
    e.preventDefault();
    let text = e.target.text.value;
    let type = e.target.type.value;
    let interviewId = this.props.interviewId
    let projectId = this.props.projectId;
    const insight = {
      text: text,
      type: type,
      interview_id: interviewId,
      project_id: projectId,
      creator_id: sessionStorage.getItem('id')
    }
    e.currentTarget.reset();
    this.props.saveInsight(insight);
  }

  onDelete = e =>
  {
    const insightId = e.currentTarget.title;
    this.props.deleteInsight(insightId);
  }
}

export default redux(Insights);