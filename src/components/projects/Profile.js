import React, { Component } from "react";
import redux from 'seed/redux';

import cx from 'classnames';
import { lcs, lc } from 'components/util/Locales';
import { hasProjectPermission } from 'components/util/Permissions';
import { Route, Link } from "react-router-dom";

import ProjectHeader from 'components/projects/Header';
import KeyPerformanceIndicators from 'components/projects/KeyPerformanceIndicators';
import KeyFeatures from 'components/projects/KeyFeatures';
import MarketSize from 'components/projects/MarketSize';
import PrototypeMetrics from 'components/projects/PrototypesMetrics';
import Trl from 'components/projects/Trl'
import Fit from 'components/projects/Fit'
import Frontiers from 'components/projects/Frontiers'
import DevStages from 'components/projects/DevStages'
import FinancialBoard from 'components/projects/FinancialBoard'
import Export from 'components/projects/Export';
import Members from 'components/projects/Members'
import Caption from 'components/helpers/Caption';
import Modal from 'seed/components/helpers/Modal'
import Loading from 'seed/components/helpers/Loading'

import 'resources/bootstrap.min.module.css';
import c from 'resources/css/projects/Profile.module.css';
import { Switch } from "@material-ui/core";


class Profile extends Component
{
  renderSteper(trls, trlIndex)
  {
    let trlList = [];
    const { url } = this.props.match;
    for (let i = 1; i <= trls.length; i++) {
      trlList.push(

        <div
          key={i}
          className={cx(
            "progress-bar",
            trlIndex >= i ? c.trlSuccess : c.trlPending
          )}
          style={{ width: "11.11%" }}>
          <Link to={`${url}/trl/${trls[i - 1].id}`}
            style={{ color: trlIndex >= i ? "#fff" : "#777" }}>
            {i}
          </Link>
        </div>
      );
    }
    return <div className={c.flexRowContainer}>{trlList}</div>;
  }

  renderInvestment()
  {
    let irlList = [
      { name: lcs("irl_1"), description: lcs("irl_1d"), value: false },
      { name: lcs("irl_2"), description: lcs("irl_2d"), value: false },
      { name: lcs("irl_3"), description: lcs("irl_3d"), value: false },
      { name: lcs("irl_4"), description: lcs("irl_4d"), value: false },
      { name: lcs("irl_5"), description: lcs("irl_5d"), value: false },
      { name: lcs("irl_6"), description: lcs("irl_6d"), value: false },
      { name: lcs("irl_7"), description: lcs("irl_7d"), value: false },
      { name: lcs("irl_8"), description: lcs("irl_8d"), value: false },
      { name: lcs("irl_9"), description: lcs("irl_9d"), value: false }
    ];

    return irlList.map(bullet =>
    {
      return (
        <tr key={bullet.name}>
          <Caption maxLen={200} offset={Math.ceil(bullet.description.length / 55) * -20} text={bullet.description}>
            <td className={c.alignLeft} style={{ cursor: "pointer" }}>{bullet.name}</td>
          </Caption>
          <td className={c.alightRight}>
            <input
              className={cx(c["styled-checkbox"])}
              type="checkbox"
              value={bullet.value}
              checked={bullet.value} />
            <label htmlFor="styled-checkbox-1" />
          </td>
        </tr>
      );
    });
  }

  renderFit(fitLevel)
  {
    let fitList = [
      { name: lcs("fit_1"), value: true, category: "PROBLEM_SOLUTION" },
      { name: lcs("fit_2"), value: false, category: "PRODUCT_MARKET" },
      { name: lcs("fit_3"), value: false, category: "BUSINESS_MODEL" }
    ];

    let active = false
    for (let i = fitList.length - 1; i >= 0; i--) {
      active = fitLevel == fitList[i].category || active;
      fitList[i].value = active;
    }

    const { url } = this.props.match;
    let fits = [];
    for (let i = 0; i < fitList.length; i++) {
      active = fitLevel == fitList[i].category || active;
      fits.push(
        <div
          key={i}
          className={cx(
            "progress-bar",
            fitList[i].value ? c.trlSuccess : c.trlPending
          )}
          style={{ width: "33%", paddingLeft: "5px", paddingRight: "5px" }}>
          <Link to={`${url}/fit/${fitList[i].category.toLowerCase()}`}
            style={{ color: fitList[i].value ? "#fff" : "#777" }}>
            {i + 1}
          </Link>
        </div>
      );
    }
    return <div className={c.flexRowContainer}>{fits}</div>;
  }

  renderDevelopment(devStageLevel)
  {
    let developmentList = [
      { name: lcs("development_1"), value: true, category: "STARTUP" },
      { name: lcs("development_2"), value: false, category: "GROW_UP" },
      { name: lcs("development_3"), value: false, category: "SCALE_UP" },
      { name: lcs("development_4"), value: false, category: "INDUSTRY_MASTER" }
    ];

    let active = false
    for (let i = developmentList.length - 1; i >= 0; i--) {
      active = devStageLevel == developmentList[i].category || active;
      developmentList[i].value = active;
    }

    const { url } = this.props.match;

    let devs = [];
    for (let i = 0; i < developmentList.length; i++) {
      devs.push(
        <div
          key={i}
          className={cx(
            "progress-bar",
            developmentList[i].value ? c.trlSuccess : c.trlPending
          )}
          style={{ width: "24%", paddingLeft: "5px", paddingRight: "5px" }}>
          <Link to={`${url}/dev_stages/${developmentList[i].category.toLowerCase()}`}
            style={{ color: developmentList[i].value ? "#fff" : "#777" }}>
            {i + 1}
          </Link>
        </div>
      );
    }
    return <div className={c.flexRowContainer}>{devs}</div>;
  }

  renderkeyFeaturesTable(keyFeatures)
  {
    return keyFeatures.map((feature, index) =>
    {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>{feature}</td>
        </tr>
      );
    });
  }

  render()
  {
    const { trls = [] } = this.props;
    const { project_id } = this.props.match.params;

    const projectDetails = this.props.projectDetails.filter(p => p.project_id == project_id)[0];
    const project = this.props.projects.filter(p => p.id == project_id)[0];

    if (projectDetails == null || project == null) return <Loading />;


    const trlLevel = projectDetails.trl_level;
    const fitLevel = projectDetails.fit_level;
    let fitIdx = 0;
    if (fitLevel == "PROBLEM_SOLUTION") fitIdx = 1;
    if (fitLevel == "PRODUCT_MARKET") fitIdx = 2;
    if (fitLevel == "BUSINESS_MODEL") fitIdx = 3;
    let nextFitLevel = "PROBLEM_SOLUTION";
    if (fitIdx == 1) nextFitLevel = "PRODUCT_MARKET";
    if (fitIdx >= 2) nextFitLevel = "BUSINESS_MODEL";
    let fitName = lcs("fit_" + fitIdx);
    const devStageLevel = projectDetails.dev_stage_level;
    let devStageIdx = 0;
    if (devStageLevel == "STARTUP") devStageIdx = 1;
    if (devStageLevel == "GROW_UP") devStageIdx = 2;
    if (devStageLevel == "SCALE_UP") devStageIdx = 3;
    if (devStageLevel == "INDUSTRY_MASTER") devStageIdx = 4;
    let nextDevStageLevel = "STARTUP";
    if (devStageIdx == 1) nextDevStageLevel = "GROW_UP";
    if (devStageIdx == 2) nextDevStageLevel = "SCALE_UP";
    if (devStageIdx >= 3) nextDevStageLevel = "INDUSTRY_MASTER";
    let devStageName = lcs("development_" + devStageIdx);
    const frontierLevels = projectDetails.frontier_level.split(",");
    let nextFrontier = "H3"
    if (!frontierLevels.includes("H2")) nextFrontier = "H2"
    if (!frontierLevels.includes("H1")) nextFrontier = "H1"

    const trlModal = props =>
      <Modal
        match={props.match}
        onClose={this.onModalClose}
        width={580}
        height={580}>
        <Trl />
      </Modal>
    const fitModal = props =>
      <Modal
        match={props.match}
        onClose={this.onModalClose}
        width={580}
        height={580}>
        <Fit />
      </Modal>
    const frontierModal = props =>
      <Modal
        match={props.match}
        onClose={this.onModalClose}
        width={580}
        height={580}>
        <Frontiers />
      </Modal>
    const devStageModal = props =>
      <Modal
        match={props.match}
        onClose={this.onModalClose}
        width={580}
        height={580}>
        <DevStages />
      </Modal>

    const financialBoard = props =>
      <Modal
        onClose={this.onModalClose}
        width={550}
        height={600}>
        <FinancialBoard
          projectDetails={projectDetails} />
      </Modal>

    const { path, url } = this.props.match;

    return (
      <div className={c.module}>
        <div className={"container"}>
          <div
            className={cx(
              "row",
              c.spacingContainer,
              "justify-content-md-center"
            )}
            style={{ paddingTop: "30px" }}>
            <div
              className={cx(
                "col-sm-10",
                "col-md-8",
                "col-lg-7",
                "col-xl-7")}>
              <ProjectHeader
                projectDetails={projectDetails}
                project={project}
                setProject={this.props.setProject}
                setProjectDetail={this.props.setProjectDetail} />
              <KeyPerformanceIndicators
                projectDetails={projectDetails}
                project={project}
                setProjectDetail={this.props.setProjectDetail} />
              <KeyFeatures
                projectDetails={projectDetails}
                project={project}
                setProjectDetail={this.props.setProjectDetail}
                setProjectFeature={this.props.setProjectFeature} />

              {
                hasProjectPermission(project, ["MEMBER"]) || projectDetails.financial_visibility == "PUBLIC" ?
                  <div className={cx("card", c.card)}>
                    <div className={cx("card-body")}>
                      <h5 className={cx("card-title", c.cardTitle)}>
                        {lcs("financial_board")}&nbsp;
                    {hasProjectPermission(project, ["MEMBER"]) ?
                          <label className={c.financialSwitch}>
                            <Switch
                              checked={projectDetails.financial_visibility == "PUBLIC"}
                              onChange={this.onFinancialVChange} />
                            {lcs("public")}
                          </label> : null}
                        <Link to={`${url}/financial_board`}>
                          <button
                            className={cx("btn", "btn-md", c.buttonPrimary, c.openButton)}
                            type="button">
                            {lcs("open")}
                          </button>
                        </Link>
                      </h5>
                    </div>
                  </div> : null
              }


              <MarketSize
                projectDetails={projectDetails}
                project={project}
                setProjectDetail={this.props.setProjectDetail} />

              <Members
                projectDetails={projectDetails}
                project={project} />
            </div>
            <div
              className={cx(
                "col-sm-10",
                "col-md-8",
                "col-lg-4",
                "col-xl-4")}>

              {/* TRL */}
              <div className={cx("card", c.card)}>
                <div className={cx("card-body")}>
                  <h5 className={cx("card-title", c.cardTitle)}>
                    {lcs("technology_readiness_levels")}<br />
                    {trls.length > 0 ?
                      <span className={cx("font-weight-bold")}>
                        {lcs("level")}: {" "}
                        {trlLevel}. {trlLevel > 0 ? lc(trls[trlLevel - 1].l_name) : ""}
                      </span> : null}
                    {hasProjectPermission(project, ["MEMBER"]) ?
                      <button
                        onClick={this.onClickOpen}
                        className={cx(c.edit)}>
                        <Link to={`${url}/trl/${trlLevel < trls.length ? trlLevel + 1 : trlLevel}`}>
                          <i className="fas fa-edit fa-xs" />
                        </Link>
                      </button> : null
                    }
                  </h5>
                  <div className={cx("card-text")}>
                    <div
                      className={cx("progress", c.trlContainer)}
                      style={{ height: "40px" }}>
                      {this.renderSteper(trls, trlLevel)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Development state */}
              <div className={cx("card", c.card)}>
                <div className={cx("card-body")}>
                  <h5 className={cx("card-title", c.cardTitle)}>
                    {lcs("development_stage")}<br />
                    <span className={cx("font-weight-bold")}>
                      {lcs("level")}: {" "}
                      {devStageIdx}. {devStageName}
                    </span>
                    {hasProjectPermission(project, ["MEMBER"]) ?
                      <button
                        onClick={this.onClickOpen}
                        className={cx(c.edit)}>
                        <Link to={`${url}/dev_stages/${nextDevStageLevel.toLowerCase()}`}>
                          <i className="fas fa-edit fa-xs" />
                        </Link>
                      </button> : null}
                  </h5>
                  <div className={cx("card-text")}>
                    <table className={c.irlTable}>
                      <tbody>{this.renderDevelopment(devStageLevel)}</tbody>
                    </table>
                  </div>

                  <h5 className={cx("card-title", c.cardTitle)} style={{ marginTop: "10px" }}>
                    {lcs("fit")}<br />
                    <span className={cx("font-weight-bold")}>
                      {lcs("level")}: {" "}
                      {fitIdx}. {fitName}
                    </span>
                    {hasProjectPermission(project, ["MEMBER"]) ?
                      <button
                        onClick={this.onClickOpen}
                        className={cx(c.edit)}>
                        <Link to={`${url}/fit/${nextFitLevel.toLowerCase()}`}>
                          <i className="fas fa-edit fa-xs" />
                        </Link>
                      </button> : null}
                  </h5>
                  <div className={cx("card-text")}>
                    <table className={c.irlTable}>
                      <tbody>{this.renderFit(fitLevel)}</tbody>
                    </table>
                  </div>

                </div>
              </div>

              {/* Frotiners */}
              <div className={cx("card", c.card)} style={{ paddingBottom: "40px" }}>
                <div className={cx("card-body")}>
                  <h5 className={cx("card-title", c.cardTitle)}>
                    {lcs("frontiers")}&nbsp;
                    {hasProjectPermission(project, ["MEMBER"]) ?
                      <button
                        onClick={this.onClickOpen}
                        className={cx(c.edit)}>
                        <Link to={`${url}/frontiers/${nextFrontier}`}>
                          <i className="fas fa-edit fa-xs" />
                        </Link>
                      </button> : null}
                  </h5>

                </div>
                <Link to={`${url}/frontiers/h3`}><div className={c.horizonBox} style={{ width: "250px", height: "250px", background: frontierLevels.includes("H3") ? "#1cab68" : "#ffffff" }}></div></Link>
                <Link to={`${url}/frontiers/h2`}><div className={c.horizonBox} style={{ width: "160px", height: "160px", background: frontierLevels.includes("H2") ? "#51A0FB" : "#ffffff", marginTop: "-160px" }}></div></Link>
                <Link to={`${url}/frontiers/h1`}><div className={c.horizonBox} style={{ width: "80px", height: "80px", background: frontierLevels.includes("H1") ? "#ffc040" : "#ffffff", marginTop: "-80px" }}></div></Link>
                <div className={c.horizonText} style={{ marginLeft: "35px" }}>{lcs("frontier")} 1</div>
                <div className={c.horizonText} style={{ marginLeft: "115px" }}>{lcs("frontier")} 2</div>
                <div className={c.horizonText} style={{ marginLeft: "200px" }}>{lcs("frontier")} 3</div>

              </div>

              {/* IRL */}
              <div className={cx("card", c.card)}>
                <div className={cx("card-body")}>
                  <h5 className={cx("card-title", c.cardTitle)}>
                    {lcs("investment_readiness_levels")}
                    &nbsp;&nbsp;<small style={{ color: "#a0a0a0" }}>({lcs("autogenerated")})</small>
                  </h5>
                  <div className={cx("card-text")}>
                    <table className={c.irlTable}>
                      <tbody>{this.renderInvestment()}</tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Prototypes and Metrics */}
              <PrototypeMetrics
                projectDetails={projectDetails}
                project={project}
                uploadFile={this.props.uploadFile}
                setProjectDetail={this.props.setProjectDetail} />
              {hasProjectPermission(project, ["MEMBER"]) || hasProjectPermission(project, ["C_ADMIN"]) ?
                <Export
                  projectDetails={projectDetails}
                  project={project} /> : null}

            </div>
          </div>
        </div>

        <Route path={`${path}/trl/:trl_id(\\d+)`}
          component={trlModal} />

        <Route path={`${path}/fit/:category`}
          component={fitModal} />

        <Route path={`${path}/frontiers/:category`}
          component={frontierModal} />

        <Route path={`${path}/dev_stages/:category`}
          component={devStageModal} />

        <Route path={`${path}/financial_board`}
          component={financialBoard} />
      </div >
    );
  }

  constructor(props)
  {
    super(props);
    this.renderSteper = this.renderSteper.bind(this);
    this.renderkeyFeaturesTable = this.renderkeyFeaturesTable.bind(this);
    this.onFinancialVChange = this.onFinancialVChange.bind(this);
  }

  componentDidMount()
  {
    const { project_id } = this.props.match.params;
    this.loadData(project_id);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.match.params.project_id !== this.props.match.params.project_id)
      this.loadData(nextProps.match.params.project_id);
  }

  onFinancialVChange()
  {
    const { project_id } = this.props.match.params;
    const projectDetails = this.props.projectDetails.filter(p => p.project_id == project_id)[0];
    const isPublic = projectDetails.financial_visibility == "PUBLIC";
    this.props.setProjectDetail(project_id, { financial_visibility: isPublic ? "PRIVATE" : "PUBLIC" })
  }

  loadData(projectId)
  {
    this.props.getProjectDetailList({ project: projectId });
    this.props.getTrlList();
    this.props.getTrlStatusList({ project_id: projectId });
  }

  onModalClose = () =>
  {
    const { url } = this.props.match;
    this.props.history.push(url);
  };

}

export default redux(Profile);
