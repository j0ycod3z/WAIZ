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

class Cohort extends React.Component
{
  render()
  {

    let fundingLabels = []
    let fundingData = [];
    for (let ind in this.state.funding) {
      fundingLabels.push(ind)
      fundingData.push(parseInt(this.state.funding[ind]))
    }

    let industryLabels = []
    let industryData = [];
    for (let ind in this.state.industry) {
      industryLabels.push(format(ind))
      industryData.push(parseInt(this.state.industry[ind]))
    }

    let locationLabels = []
    let locationData = [];
    for (let ind in this.state.locations) {
      locationLabels.push(format(ind))
      locationData.push(parseInt(this.state.locations[ind]))
    }

    let genreLabels = []
    let genreData = [];
    for (let ind in this.state.genres) {
      genreLabels.push(format(ind))
      genreData.push(parseInt(this.state.genres[ind]))
    }

    let universityLabels = []
    let universityData = [];
    for (let ind in this.state.universities) {
      universityLabels.push(format(ind))
      universityData.push(parseInt(this.state.universities[ind]))
    }

    let enterpreneurLabels = []
    let enterpreneurData = [];
    for (let ind in this.state.enterpreneurs) {
      enterpreneurLabels.push(format(ind))
      enterpreneurData.push(parseInt(this.state.enterpreneurs[ind]))
    }

    let trlLabels = []
    let trlData = [];
    for (let ind in this.state.trls) {
      trlLabels.push(format(ind))
      trlData.push(parseInt(this.state.trls[ind]))
    }

    let frontierLabels = []
    let frontierData = [];
    for (let ind in this.state.frontiers) {
      frontierLabels.push(format(ind))
      frontierData.push(parseInt(this.state.frontiers[ind]))
    }

    let salesS = []
    for (let s in this.state.sales) salesS.push({ name: s, count: this.state.sales[s] });
    salesS = salesS.sort((s1, s2) => s2.count - s1.count).slice(0,15);
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
          <div className="col col-12 col-lg-8">
            <BarChartCard title="Sales" data={salesData} labels={salesLabels} label={"Sales (USD)"} showNames={true} />
          </div>
          <div className="col col-12 col-lg-4">
            <DoubleBarChartCard title="Startup Funding" data={fundingData} labels={fundingLabels} label={"Num. startups"} percentage={false} />
          </div>


        </div>

        <div className={cx("row", c.chartRow)}>
          <div className="col col-12 col-lg-8">
            <HorizontalBarChartCard title="Startup Industry" data={industryData} labels={industryLabels} percentage={false} color={"#258DE8"} />
          </div>
          <div className={cx("col col-12 col-lg-4")}>
            <LargeDoughnutChartCard title="Location" data={locationData} labels={locationLabels} />
          </div>
        </div>

        <h2 className={c.pageTitle}>People</h2>
        <div className={cx("row", c.chartRow)}>
          <div className={cx("col col-12 col-lg-4")}>
            <LargeDoughnutChartCard title="Gender" data={genreData} labels={genreLabels} />
          </div>
          <div className={cx("col col-12 col-lg-8")}>
            <BarChartCard title="Universities" label={"Universities"} data={universityData} labels={universityLabels} showNames={true} />
          </div>
        </div>

        <h2 className={c.pageTitle}>Projects</h2>
        <div className={cx("row", c.chartRow)}>
          <div className="col col-12 col-lg-4">
            <LargeDoughnutChartCard title="Development Stage" data={enterpreneurData} labels={enterpreneurLabels} />
          </div>
          <div className={cx("col col-12 col-lg-4")}>
            <LargeDoughnutChartCard title="TRL Level" data={trlData} labels={trlLabels} />
          </div>
          <div className="col col-12 col-lg-4">
            <LargeDoughnutChartCard title="Horizon" data={frontierData} labels={frontierLabels} />
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
      locations: {},
      genres: {},
      universities: {},
      enterpreneurs: {},
      trls: {},
      frontiers: {},
      sales: {}
    }
  }

  componentDidMount()
  {
    const cohortId = localStorage.getItem('cohortId');

    const callbackFu = res => this.setState(s => ({ funding: res.body }))
    this.props.getStats("/cohort/get_funding", { cohort_id: cohortId }, callbackFu)

    const callbackIn = res => this.setState(s => ({ industry: res.body }))
    this.props.getStats("/cohort/get_projects_by_sector", { cohort_id: cohortId }, callbackIn)

    const callbackLo = res => this.setState(s => ({ locations: res.body }))
    this.props.getStats("/cohort/get_projects_by_country", { cohort_id: cohortId }, callbackLo)

    const callbackGe = res => this.setState(s => ({ genres: res.body }))
    this.props.getStats("/cohort/get_gender", { cohort_id: cohortId }, callbackGe)

    const callbackUn = res => this.setState(s => ({ universities: res.body }))
    this.props.getStats("/cohort/get_universities_companies", { cohort_id: cohortId }, callbackUn)

    const callbackEn = res => this.setState(s => ({ enterpreneurs: res.body }))
    this.props.getStats("/cohort/get_dev_stage_level", { cohort_id: cohortId }, callbackEn)

    const callbackTrl = res => this.setState(s => ({ trls: res.body }))
    this.props.getStats("/cohort/get_tlr_level", { cohort_id: cohortId }, callbackTrl)

    const callbackFr = res => this.setState(s => ({ frontiers: res.body }))
    this.props.getStats("/cohort/get_frontiers", { cohort_id: cohortId }, callbackFr)

    const callbackSa = res => this.setState(s => ({ sales: res.body }))
    this.props.getStats("/cohort/get_sales", { cohort_id: cohortId }, callbackSa)
  }
}

export default redux(Cohort);