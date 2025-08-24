import React from 'react';
import redux from 'seed/redux';
import c from 'resources/css/dashboards/pages/Pages.module.css';
import "react-bootstrap";
import cx from 'classnames';
import { lcs, lc } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'

import DoubleBarChartCard from 'components/dashboards/charts/DoubleBarChartCard';
import HorizontalBarChartCard from 'components/dashboards/charts/HorizontalBarChartCard';
import BarChartCard from 'components/dashboards/charts/BarChartCard';
import LargeDoughnutChartCard from 'components/dashboards/charts/LargeDoughnutChartCard';

class Industry extends React.Component
{
  render()
  {
    let fundingLabels = []
    let fundingData = [];
    let fundingAll = 0;
    for (let ind in this.state.funding) {
      fundingLabels.push(ind)
      fundingData.push(parseInt(this.state.funding[ind]))
      fundingAll += parseInt(this.state.funding[ind])
    }
    fundingData = fundingData.map(i => Math.floor(i / fundingAll * 100));


    let industryLabels = []
    let industryData = [];
    let industryAll = 0;
    for (let ind in this.state.industry) {
      industryLabels.push(format(ind))
      industryData.push(parseInt(this.state.industry[ind]))
      industryAll += parseInt(this.state.industry[ind])
    }
    industryData = industryData.map(i => Math.floor(i / industryAll * 100));

    let employeesLabels = []
    let employeesData = [];
    for (let ind in this.state.employees) {
      employeesLabels.push(format(ind))
      employeesData.push(parseInt(this.state.employees[ind]))
    }

    let patentsLabels = []
    let patentsData = [];
    for (let ind in this.state.patents) {
      patentsLabels.push(format(ind))
      patentsData.push(parseInt(this.state.patents[ind]))
    }

    let locationLabels = []
    let locationData = [];
    for (let ind in this.state.locations) {
      locationLabels.push(format(ind))
      locationData.push(parseInt(this.state.locations[ind]))
    }

    let salesLabels = []
    let salesData = [];
    for (let ind in this.state.sales) {
      salesLabels.push(format(ind))
      salesData.push(parseInt(this.state.sales[ind]))
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
          {/*
          <div className="col col-12 col-lg-4">
            <LargeDoughnutChartCard title="Type of enterpreneurship" />
          </div>*/}
          <div className="col col-12 col-lg-12">
            <BarChartCard title="Sales" data={salesData} labels={salesLabels} label={"Industry average"}/>
          </div>

        </div>

      </div>
    )
  }
  constructor(props)
  {
    super(props);
    this.state = {
      funding: {},
      industry: {},
      employees: {},
      patents: {},
      locations: {},
      sales: {}
    }
  }

  componentDidMount()
  {
    const callbackFu = res => this.setState(s => ({ funding: res.body }))
    this.props.getStats("/industry/get_funding", {}, callbackFu)

    const callbackIn = res => this.setState(s => ({ industry: res.body }))
    this.props.getStats("/industry/get_projects_by_sector", {}, callbackIn)

    const callbackEm = res => this.setState(s => ({ employees: res.body }))
    this.props.getStats("/industry/get_employees_by_sector", {}, callbackEm)

    const callbackPa = res => this.setState(s => ({ patents: res.body }))
    this.props.getStats("/industry/get_pattents_by_sector", {}, callbackPa)

    const callbackLo = res => this.setState(s => ({ locations: res.body }))
    this.props.getStats("/industry/get_projects_by_country", {}, callbackLo)

    const callbackSa = res => this.setState(s => ({ sales: res.body }))
    this.props.getStats("/industry/get_industry_by_position", {}, callbackSa)

  }
}

export default redux(Industry);