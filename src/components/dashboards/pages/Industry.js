import React from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "resources/bootstrap.min.module.css";
import cx from 'classnames';
import { format } from 'components/dashboards/util/Util'

import DoubleBarChartCard from 'components/dashboards/charts/DoubleBarChartCard';
import HorizontalBarChartCard from 'components/dashboards/charts/HorizontalBarChartCard';
import BarChartCard from 'components/dashboards/charts/BarChartCard';
import LargeDoughnutChartCard from 'components/dashboards/charts/LargeDoughnutChartCard';

function Industry (props)
{
  const { getStats } = props;


  const [funding, setFunding] = useState({});
  const [industry, setIndustry] = useState({});
  const [employees, setEmployees] = useState({});
  const [patents, setPatents] = useState({});
  const [locations, setLocations] = useState({});
  const [sales, setSales] = useState({});


  useEffect(() => {
    getStats("/industry/get_funding", {}, res => setFunding(res.body));
    getStats("/industry/get_projects_by_sector", {}, res => setIndustry(res.body));
    getStats("/industry/get_employees_by_sector", {}, res => setEmployees(res.body));
    getStats("/industry/get_pattents_by_sector", {}, res => setPatents(res.body));
    getStats("/industry/get_projects_by_country", {}, res => setLocations(res.body));
    getStats("/industry/get_industry_by_position", {}, res => setSales(res.body));
  }, [getStats]);

  let fundingLabels = [];
  let fundingData = [];
  let fundingAll = 0;
  for (let ind in funding) {
    fundingLabels.push(ind);
    fundingData.push(parseInt(funding[ind]));
    fundingAll += parseInt(funding[ind]);
  }
  fundingData = fundingData.map(i => Math.floor(i / fundingAll * 100));


  let industryLabels = [];
  let industryData = [];
  let industryAll = 0;
  for (let ind in industry) {
    industryLabels.push(format(ind));
    industryData.push(parseInt(industry[ind]));
    industryAll += parseInt(industry[ind]);
  }
  industryData = industryData.map(i => Math.floor(i / industryAll * 100));


  let employeesLabels = [];
  let employeesData = [];
  for (let ind in employees) {
    employeesLabels.push(format(ind));
    employeesData.push(parseInt(employees[ind]));
  }


  let patentsLabels = [];
  let patentsData = [];
  for (let ind in patents) {
    patentsLabels.push(format(ind));
    patentsData.push(parseInt(patents[ind]));
  }


  let locationLabels = [];
  let locationData = [];
  for (let ind in locations) {
    locationLabels.push(format(ind));
    locationData.push(parseInt(locations[ind]));
  }


  let salesLabels = [];
  let salesData = [];
  for (let ind in sales) {
    salesLabels.push(format(ind));
    salesData.push(parseInt(sales[ind]));
  }

  return (
    <div className={c.module}>
      <h2 className={c.pageTitle}>Overview</h2>
      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-6">
          <DoubleBarChartCard title="Startup Funding" data={fundingData} labels={fundingLabels} label={"Industry average"} />
        </div>
        <div className="col col-12 col-lg-6">
          <HorizontalBarChartCard title="Startup industry" data={industryData} labels={industryLabels} />
        </div>
      </div>

      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-4">
          <BarChartCard title="Employments" data={employeesData} labels={employeesLabels} label={"Industry average"} />
        </div>
        <div className="col col-12 col-lg-4">
          <BarChartCard title="Patents" data={patentsData} labels={patentsLabels} label={"Industry average"} color={"#258DE8"} />
        </div>
        <div className="col col-12 col-lg-4">
          <LargeDoughnutChartCard title="Location" data={locationData} labels={locationLabels} usePercentage={true} />
        </div>
      </div>

      <div className={cx("row", c.chartRow)}>
        <div className="col col-12 col-lg-12">
          <BarChartCard title="Sales" data={salesData} labels={salesLabels} label={"Industry average"} />
        </div>
      </div>
    </div>
  );
}

export default redux(Industry);