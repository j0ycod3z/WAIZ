import React, { useState, useEffect } from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import cx from 'classnames';
import { format } from 'components/dashboards/util/Util'

import LargeDoughnutChartCard from 'components/dashboards/charts/LargeDoughnutChartCard';
import BarChartCard from 'components/dashboards/charts/BarChartCard';
import DoubleBarChartCard from 'components/dashboards/charts/DoubleBarChartCard';
import BolaCard from 'components/dashboards/charts/BolaCard';
import HorizontalBarChartCard from 'components/dashboards/charts/HorizontalBarChartCard';

function Cohort(props) {
  const { getStats } = props;

  const [funding, setFunding] = useState({});
  const [industry, setIndustry] = useState({});
  const [locations, setLocations] = useState({});
  const [genres, setGenres] = useState({});
  const [universities, setUniversities] = useState({});
  const [enterpreneurs, setEnterpreneurs] = useState({});
  const [trls, setTrls] = useState({});
  const [frontiers, setFrontiers] = useState({});
  const [sales, setSales] = useState({});

  useEffect(() => {
    const cohortId = localStorage.getItem('cohortId');

    getStats("/cohort/get_funding", { cohort_id: cohortId },
      (res) => setFunding(res.body)
    );
    getStats("/cohort/get_projects_by_sector", { cohort_id: cohortId },
      (res) => setIndustry(res.body)
    );
    getStats("/cohort/get_projects_by_country", { cohort_id: cohortId },
      (res) => setLocations(res.body)
    );
    getStats("/cohort/get_gender", { cohort_id: cohortId },
      (res) => setGenres(res.body)
    );
    getStats("/cohort/get_universities_companies", { cohort_id: cohortId },
      (res) => setUniversities(res.body)
    );
    getStats("/cohort/get_dev_stage_level", { cohort_id: cohortId },
      (res) => setEnterpreneurs(res.body)
    );
    getStats("/cohort/get_tlr_level", { cohort_id: cohortId },
      (res) => setTrls(res.body)
    );
    getStats("/cohort/get_frontiers", { cohort_id: cohortId },
      (res) => setFrontiers(res.body)
    );
    getStats("/cohort/get_sales", { cohort_id: cohortId },
      (res) => setSales(res.body)
    );
  }, [getStats]);

  let fundingLabels = []
  let fundingData = [];
  for (let ind in funding) {
    fundingLabels.push(ind)
    fundingData.push(parseInt(funding[ind]))
  }

  let industryLabels = []
  let industryData = [];
  for (let ind in industry) {
    industryLabels.push(format(ind))
    industryData.push(parseInt(industry[ind]))
  }

  let locationLabels = []
  let locationData = [];
  for (let ind in locations) {
    locationLabels.push(format(ind))
    locationData.push(parseInt(locations[ind]))
  }

  let genreLabels = []
  let genreData = [];
  for (let ind in genres) {
    genreLabels.push(format(ind))
    genreData.push(parseInt(genres[ind]))
  }

  let universityLabels = []
  let universityData = [];
  for (let ind in universities) {
    universityLabels.push(format(ind))
    universityData.push(parseInt(universities[ind]))
  }

  let enterpreneurLabels = []
  let enterpreneurData = [];
  for (let ind in enterpreneurs) {
    enterpreneurLabels.push(format(ind))
    enterpreneurData.push(parseInt(enterpreneurs[ind]))
  }

  let trlLabels = []
  let trlData = [];
  for (let ind in trls) {
    trlLabels.push(format(ind))
    trlData.push(parseInt(trls[ind]))
  }

  let frontierLabels = []
  let frontierData = [];
  for (let ind in frontiers) {
    frontierLabels.push(format(ind))
    frontierData.push(parseInt(frontiers[ind]))
  }

  let salesS = []
  for (let s in sales) salesS.push({ name: s, count: sales[s] });
  salesS = salesS.sort((s1, s2) => s2.count - s1.count).slice(0, 15);
  let salesLabels = []
  let salesData = [];
  for (let s of salesS) {
    salesLabels.push(format(s.name))
    salesData.push(parseInt(s.count))
  }

  return (
    <div className={c.module}>
      <h2 className={c.pageTitle}>Financial</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col-lg-8">
          <BarChartCard title="Sales" data={salesData} labels={salesLabels} label={"Sales (USD)"} showNames={true} />
        </div>
        <div className="col-lg-4">
          <DoubleBarChartCard title="Startup Funding" data={fundingData} labels={fundingLabels} label={"Num. startups"} percentage={false} />
        </div>
      </div>

      <div className={cx("row", c.chartRow)}>
        <div className="col-lg-8">
          <HorizontalBarChartCard title="Startup Industry" data={industryData} labels={industryLabels} percentage={false} color={"#258DE8"} />
        </div>
        <div className={cx("col-lg-4")}>
          <LargeDoughnutChartCard title="Location" data={locationData} labels={locationLabels} />
        </div>
      </div>

      <h2 className={c.pageTitle}>People</h2>
      <div className={cx("row", c.chartRow)}>
        <div className={cx("col-lg-4")}>
          <LargeDoughnutChartCard title="Gender" data={genreData} labels={genreLabels} />
        </div>
        <div className={cx("col-lg-8")}>
          <BarChartCard title="Universities" label={"Universities"} data={universityData} labels={universityLabels} showNames={true} />
        </div>
      </div>

      <h2 className={c.pageTitle}>Projects</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col-lg-4">
          <LargeDoughnutChartCard title="Development Stage" data={enterpreneurData} labels={enterpreneurLabels} />
        </div>
        <div className={cx("col-lg-4")}>
          <LargeDoughnutChartCard title="TRL Level" data={trlData} labels={trlLabels} />
        </div>
        <div className="col-lg-4">
          <LargeDoughnutChartCard title="Horizon" data={frontierData} labels={frontierLabels} />
        </div>
      </div>
    </div>
  );
}

export default redux(Cohort);