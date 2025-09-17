import { useEffect } from 'react';
import redux from 'seed/redux';

import { lcs } from "components/util/Locales"
import List from 'components/canvas_forms/insights/List'

import c from 'components/canvas_forms/Insights.module.scss'

function Insights(props) {
  const { match, canvases, insights, getInsightList } = props;
  const { area_id, canvas_id } = match.params;

  const canvas = canvases.find((canvas) => canvas.id === parseInt(canvas_id));
  const projectId = canvas ? canvas.project_id : 0;

  const filteredInsights = insights.filter((insight) => insight.area_id === parseInt(area_id) && insight.project_id === projectId);

  useEffect(() => {
    getInsightList({ area: area_id, project: projectId });
  }, [area_id, canvas_id, canvases]);
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    const text = e.target.text.value;
    const type = e.target.type.value;
    
    const comment = {
      text,
      type,
      area_id,
      interview_id: null,
      hypothesis_id: null,
      project_id: projectId,
      creator_id: sessionStorage.getItem('id')
    }

    e.currentTarget.reset();

    props.saveInsight(comment);
  }

  const onDelete = (e) => {
    const insightId = e.currentTarget.title;
    props.deleteInsight(insightId);
  }

  return (
    <div className={c.module}>
      <div className={c.listContainer}>
        <List
          insightsD={filteredInsights}
          onDelete={onDelete}
        />
      </div>
      <div className={c.formContainer}>
        <form onSubmit={onSubmit}>
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

export default redux(Insights);