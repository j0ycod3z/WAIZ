import React from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "resources/bootstrap.min.module.css";
import cx from 'classnames';
import { lcs, lc } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'

import LargeDoughnutChartCard from 'components/dashboards/charts/LargeDoughnutChartCard';
import BarChartCard from 'components/dashboards/charts/BarChartCard';
import DoubleBarChartCard from 'components/dashboards/charts/DoubleBarChartCard';
import BolaCard from 'components/dashboards/charts/BolaCard';
import HorizontalBarChartCard from 'components/dashboards/charts/HorizontalBarChartCard';

function Cohort (props)
{
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

    getStats("/cohort/get_funding", { cohort_id: cohortId }, res => setFunding(res.body));
    getStats("/cohort/get_projects_by_sector", { cohort_id: cohortId }, res => setIndustry(res.body));
    getStats("/cohort/get_projects_by_country", { cohort_id: cohortId }, res => setLocations(res.body));
    getStats("/cohort/get_gender", { cohort_id: cohortId }, res => setGenres(res.body));
    getStats("/cohort/get_universities_companies", { cohort_id: cohortId }, res => setUniversities(res.body));
    getStats("/cohort/get_dev_stage_level", { cohort_id: cohortId }, res => setEnterpreneurs(res.body));
    getStats("/cohort/get_tlr_level", { cohort_id: cohortId }, res => setTrls(res.body));
    getStats("/cohort/get_frontiers", { cohort_id: cohortId }, res => setFrontiers(res.body));
    getStats("/cohort/get_sales", { cohort_id: cohortId }, res => setSales(res.body));
  }, [getStats]);

  // Prepare chart data (unchanged logic, just swapped this.state → variables)
  let fundingLabels = Object.keys(funding);
  let fundingData = Object.values(funding).map(v => parseInt(v));

  let industryLabels = Object.keys(industry).map(i => format(i));
  let industryData = Object.values(industry).map(v => parseInt(v));

  let locationLabels = Object.keys(locations).map(i => format(i));
  let locationData = Object.values(locations).map(v => parseInt(v));

  let genreLabels = Object.keys(genres).map(i => format(i));
  let genreData = Object.values(genres).map(v => parseInt(v));

  let universityLabels = Object.keys(universities).map(i => format(i));
  let universityData = Object.values(universities).map(v => parseInt(v));

  let enterpreneurLabels = Object.keys(enterpreneurs).map(i => format(i));
  let enterpreneurData = Object.values(enterpreneurs).map(v => parseInt(v));

  let trlLabels = Object.keys(trls).map(i => format(i));
  let trlData = Object.values(trls).map(v => parseInt(v));

  let frontierLabels = Object.keys(frontiers).map(i => format(i));
  let frontierData = Object.values(frontiers).map(v => parseInt(v));

  let salesS = Object.entries(sales).map(([name, count]) => ({ name, count }));
  salesS = salesS.sort((s1, s2) => s2.count - s1.count).slice(0, 15);
  let salesLabels = salesS.map(s => format(s.name));
  let salesData = salesS.map(s => parseInt(s.count));

  return (
    <div className={c.module}>
      <h2 className={c.pageTitle}>Financial</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-8">
          <BarChartCard
            title="Sales"
            data={salesData}
            labels={salesLabels}
            label={"Sales (USD)"}
            showNames={true}
          />
        </div>
        <div className="col col-12 col-lg-4">
          <DoubleBarChartCard
            title="Startup Funding"
            data={fundingData}
            labels={fundingLabels}
            label={"Num. startups"}
            percentage={false}
          />
        </div>
      </div>

      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-8">
          <HorizontalBarChartCard
            title="Startup Industry"
            data={industryData}
            labels={industryLabels}
            percentage={false}
            color={"#258DE8"}
          />
        </div>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="Location" data={locationData} labels={locationLabels} />
        </div>
      </div>

      <h2 className={c.pageTitle}>People</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="Gender" data={genreData} labels={genreLabels} />
        </div>
        <div className="col col-12 col-lg-8">
          <BarChartCard
            title="Universities"
            label={"Universities"}
            data={universityData}
            labels={universityLabels}
            showNames={true}
          />
        </div>
      </div>

      <h2 className={c.pageTitle}>Projects</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="Development Stage" data={enterpreneurData} labels={enterpreneurLabels} />
        </div>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="TRL Level" data={trlData} labels={trlLabels} />
        </div>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="Horizon" data={frontierData} labels={frontierLabels} />
        </div>
      </div>
    </div>
  );
}

export default redux(Cohort);