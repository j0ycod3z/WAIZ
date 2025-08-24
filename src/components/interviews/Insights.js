import React, { useEffect } from 'react';
import redux from 'seed/redux';

import List from 'components/interviews/insights/List'
import { lcs } from "components/util/Locales"

import c from 'resources/css/interviews/Insights.module.css'

function Insights(props) {
  const {
    interviewId,
    projectId,
    insights,
    getInsightList,
    saveInsight,
    deleteInsight,
  } = props;
  
  const filteredInsights = insights.filter((i) => i.interview_id != null && i.interview_id === interviewId);

  useEffect(() => {
    if (interviewId !== null) getInsightList({ interview: interviewId });
  }, [interviewId, getInsightList]);
  
  const onSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const type = e.target.type.value;

    const insight = {
      text,
      type,
      interview_id: interviewId,
      project_id: projectId,
      creator_id: sessionStorage.getItem('id'),
    };

    e.currentTarget.reset();
    saveInsight(insight);
  };

  const onDelete = (e) => {
    const insightId = e.currentTarget.title;
    deleteInsight(insightId);
  };
  
  return (
    <div className={c.module}>
      <div className={c.listContainer}>
        <List insightsD={filteredInsights} onDelete={onDelete} />
      </div>
      <div className={c.formContainer}>
        <form onSubmit={onSubmit}>
          <textarea name="text" placeholder={lcs("describe_your_insight")} required />
          <select name="type" required>
            <option value="MUST_HAVE">{lcs("must_have")}</option>
            <option value="NICE_TO_HAVE">{lcs("nice_to_have")}</option>
            <option value="INVALIDATE_HYPOTHESIS">{lcs("invalidate_hypothesis")}</option>
          </select>
          <button type="submit">{lcs("add")}</button>
        </form>
      </div>
    </div>
  );
}

export default redux(Insights);