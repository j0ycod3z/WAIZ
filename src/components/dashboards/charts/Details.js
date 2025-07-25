import React from 'react';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "react-bootstrap";
import cx from 'classnames';
import { lcs, lc } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'

import LineChartCard from '../charts/LineChartCard';
import DoughnutChartCard from '../charts/DoughnutChartCard';
import BarChartCard from 'components/dashboards/charts/BarChartCard';

class Details extends React.Component
{

  render()
  {
    const { projectData = {}, hLabels = [], hDatasets = [], iLabels = [], iDatasets = [] } = this.props;

    let hipDataset = [];
    for (let h of hDatasets) {
      if (h.label == format(projectData.name))
        hipDataset.push(h)
    }

    let intDataset = [];
    for (let i of iDatasets) {
      if (i.label == format(projectData.name))
        intDataset.push(i)
    }

    let typeLabels = []
    let typeData = [];
    for (let ind in projectData.types) {
      typeLabels.push(format(ind))
      typeData.push(parseInt(projectData.types[ind]))
    }

    return (
      <div className={cx(c.module, "animated zoomIn")} >
        <div className={cx("row", c.chartRow)} style={{ marginTop: "20px" }}>
          <div className="col col-12 col-lg-8">
            <LineChartCard title={lcs("interviews")} interview={true} interviewsCount={projectData.interviews} labels={iLabels} datasets={intDataset} />
          </div>
          <div className="col col-12 col-lg-4">
            <DoughnutChartCard title={lcs("interview_types")} labels={typeLabels} data={typeData} />
          </div>
        </div>

        <div className={cx("row", c.chartRow)}>
          <div className="col col-12 col-lg-12">
            <LineChartCard title={lcs("hypotheses")} interview={false} hypothesisCount={projectData.hypothesis} labels={hLabels} datasets={hipDataset} />
          </div>
        </div>

      </div>

    )
  }
}

export default Details;