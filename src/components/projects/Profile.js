import React, { useEffect, useMemo, useCallback } from "react";
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

import Modal from 'components/helpers/Modal'
import Loading from 'components/helpers/Loading'

import c from 'components/projects/Profile.module.scss';
import { Switch } from "@material-ui/core";

function Profile(props) {
  const { match, history, trls = [], projectDetails, projects, setProject, setProjectDetail, setProjectFeature, uploadFile, getProjectDetailList, getTrlList, getTrlStatusList } = props;
  const { path, url, params } = match;
  const  project_id = params.project_id;

  const projectDetailsData = useMemo(() => (
    projectDetails.find((p) => p.project_id == project_id)
  ), [projectDetails, project_id]);

  const project = useMemo(() => (
    projects.find((p) => p.id == project_id)
  ), [projects, project_id]);

  useEffect(() => {
    getProjectDetailList({ project: project_id });
    getTrlList();
    getTrlStatusList({ project_id });
  }, [project_id, getProjectDetailList, getTrlList, getTrlStatusList]);

  if (!projectDetailsData || !project) return <Loading />;
  
  const fitLevel = projectDetailsData.fit_level;
  const trl_level = projectDetailsData.trl_level;
  let fitIdx = 0;
  if (fitLevel === "PROBLEM_SOLUTION") fitIdx = 1;
  if (fitLevel === "PRODUCT_MARKET") fitIdx = 2;
  if (fitLevel === "BUSINESS_MODEL") fitIdx = 3;

  let nextFitLevel = "PROBLEM_SOLUTION";
  if (fitIdx === 1) nextFitLevel = "PRODUCT_MARKET";
  if (fitIdx >= 2) nextFitLevel = "BUSINESS_MODEL";

  const devStageLevel = projectDetailsData.dev_stage_level;
  let devStageIdx = 0;
  if (devStageLevel === "STARTUP") devStageIdx = 1;
  if (devStageLevel === "GROW_UP") devStageIdx = 2;
  if (devStageLevel === "SCALE_UP") devStageIdx = 3;
  if (devStageLevel === "INDUSTRY_MASTER") devStageIdx = 4;

  let nextDevStageLevel = "STARTUP";
  if (devStageIdx === 1) nextDevStageLevel = "GROW_UP";
  if (devStageIdx === 2) nextDevStageLevel = "SCALE_UP";
  if (devStageIdx >= 3) nextDevStageLevel = "INDUSTRY_MASTER";

  const frontierLevels = projectDetailsData.frontier_level.split(",");
  let nextFrontier = "H3";
  if (!frontierLevels.includes("H1")) nextFrontier = "H1";
  if (!frontierLevels.includes("H2")) nextFrontier = "H2";

  const renderSteper = () => {
    return trls.map((trl, i) =>
      <li key={trl.id} className={cx("progress-bar", (trl_level - 1) >= i ? c.trlSuccess : c.trlPending)}>
        <Link to={`${url}/trl/${trl.id}`}>{i + 1}</Link>
      </li>
    )
  };
  const renderDevelopment = () => {
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

    return developmentList.map((dev, i) => (
      <li key={i} className={cx("progress-bar", dev.value ? c.trlSuccess : c.trlPending)}>
        <Link to={`${url}/dev_stages/${dev.category.toLowerCase()}`}>{i + 1}</Link>
      </li>
    ));
  }
  const renderFit = () => {
    let fitList = [
      { name: lcs("fit_1"), value: true, category: "PROBLEM_SOLUTION" },
      { name: lcs("fit_2"), value: false, category: "PRODUCT_MARKET" },
      { name: lcs("fit_3"), value: false, category: "BUSINESS_MODEL" }
    ];
    
    let active = false;
    for (let i = fitList.length - 1; i >= 0; i--) {
      active = fitLevel == fitList[i].category || active;
      fitList[i].value = active;
    }

    return fitList.map((fit, i) => (
      <li key={i} className={cx("progress-bar", fit.value ? c.trlSuccess : c.trlPending )}>
        <Link to={`${url}/fit/${fit.category.toLowerCase()}`}>{i + 1}</Link>
      </li>
    ));
  };
  const renderInvestment = () => {
    const irlList = [
      { name: lcs("irl_1"), description: lcs("irl_1d"), value: false },
      { name: lcs("irl_2"), description: lcs("irl_2d"), value: false },
      { name: lcs("irl_3"), description: lcs("irl_3d"), value: false },
      { name: lcs("irl_4"), description: lcs("irl_4d"), value: false },
      { name: lcs("irl_5"), description: lcs("irl_5d"), value: false },
      { name: lcs("irl_6"), description: lcs("irl_6d"), value: false },
      { name: lcs("irl_7"), description: lcs("irl_7d"), value: false },
      { name: lcs("irl_8"), description: lcs("irl_8d"), value: false },
      { name: lcs("irl_9"), description: lcs("irl_9d"), value: false },
    ];

    return irlList.map((bullet) => (
      <tr key={bullet.name}>
        <td className={c.alignLeft} style={{ cursor: "pointer" }}>{bullet.name}</td>
        <td className={c.alightRight}>
          <input className={cx(c["styled-checkbox"])} type="checkbox" value={bullet.value} checked={bullet.value} readOnly />
          <label htmlFor="styled-checkbox-1" />
        </td>
      </tr>
    ));
  };

  const onFinancialVChange = () => {
    const isPublic = projectDetailsData.financial_visibility == "PUBLIC";
    setProjectDetail(projectDetailsData.id, { financial_visibility: isPublic ? "PRIVATE" : "PUBLIC" });
  };

  return (
    <div className={cx(c.module, "container")}>
      <div className={cx(c.spacingContainer, "row")}>
        <div className={cx("col-md-8")}>
          <ProjectHeader projectDetails={projectDetailsData} project={project} setProject={setProject} setProjectDetail={setProjectDetail} />
          <KeyPerformanceIndicators projectDetails={projectDetailsData} project={project} setProjectDetail={setProjectDetail} />
          <KeyFeatures projectDetails={projectDetailsData} project={project} setProjectDetail={setProjectDetail} setProjectFeature={setProjectFeature} />
          {(hasProjectPermission(project, ["MEMBER"]) || projectDetailsData.financial_visibility == "PUBLIC") &&
            <div className={cx(c.card)}>
              <div className={cx("card-body")}>
                <h5 className={cx("card-title", c.cardTitle)}>
                  {lcs("financial_board")}
                  {hasProjectPermission(project, ["MEMBER"]) &&
                    <label htmlFor="financial_visibility" className={cx('d-flex', 'align-items-center')}>
                      <Switch name="financial_visibility" id="financial_visibility" checked={projectDetailsData.financial_visibility == "PUBLIC"} onChange={onFinancialVChange} />
                      {lcs("public")}
                    </label>
                  }
                  <Link to={`${url}/financial_board`}>
                    <button className={cx("btn", "btn-md", c.buttonPrimary, c.mainButton)} type="button">
                      {lcs("open")}
                    </button>
                  </Link>
                </h5>
              </div>
            </div>
          }
          <MarketSize projectDetails={projectDetailsData} project={project} setProjectDetail={setProjectDetail} />
          <Members projectDetails={projectDetailsData} project={project} />
        </div>
        <div className={cx("col-md-4")}>
          {/* TRL */}
          <div className={cx(c.card)}>
            <div className={cx("card-body")}>
              <h5 className={cx("card-title", c.cardTitle)}>
                {lcs("technology_readiness_levels")}
                {hasProjectPermission(project, ["MEMBER"]) &&
                  <button className={cx(c.edit)}>
                    <Link to={`${url}/trl/${trl_level < trls.length ? trl_level + 1 : trl_level}`}>
                      <i className="fas fa-edit fa-xs" />
                    </Link>
                  </button>
                }
              </h5>
              {trls.length > 0 &&
                <b> {`${lcs("level")}: ${trl_level} ${trl_level > 0 ? lc(trls[trl_level - 1].l_name) : ""}`}</b>
              }
              <div className={cx("card-text")}>
                <ul className={cx(c.levelList)}>
                  {renderSteper()}
                </ul>
              </div>
            </div>
          </div>
          {/* Development state */}
          <div className={cx(c.card)}>
            <div className={cx("card-body")}>
              <h5 className={cx("card-title", c.cardTitle)}>
                {lcs("development_stage")}
                {hasProjectPermission(project, ["MEMBER"]) &&
                  <button className={cx(c.edit)}>
                    <Link to={`${url}/dev_stages/${nextDevStageLevel.toLowerCase()}`}>
                      <i className="fas fa-edit fa-xs" />
                    </Link>
                  </button>
                }
              </h5>
              <b>{`${lcs("level")}: ${devStageIdx} ${lcs(`development_${devStageIdx}`)}`}</b>
              <div className={cx("card-text")}>
                <ul className={c.levelList}>
                  {renderDevelopment()}
                </ul>
              </div>
              <h5 className={cx("card-title", c.cardTitle)}>
                {lcs("fit")}
                {hasProjectPermission(project, ["MEMBER"]) &&
                  <button className={cx(c.edit)}>
                    <Link to={`${url}/fit/${nextFitLevel.toLowerCase()}`}>
                      <i className="fas fa-edit fa-xs" />
                    </Link>
                  </button>
                }
              </h5>
                <b>{`${lcs("level")}: ${fitIdx} ${lcs(`fit_${fitIdx}`)}`}</b>
              <div className={cx("card-text")}>
                <ul className={c.levelList}>
                  {renderFit()}
                </ul>
              </div>
            </div>
          </div>
          {/* Frotiners */}
          <div className={cx(c.card)}>
            <div className={cx("card-body")}>
              <h5 className={cx("card-title", c.cardTitle)}>
                {lcs("frontiers")}
                {hasProjectPermission(project, ["MEMBER"]) &&
                  <button className={cx(c.edit)}>
                    <Link to={`${url}/frontiers/${nextFrontier}`}>
                      <i className="fas fa-edit fa-xs" />
                    </Link>
                  </button>
                }
              </h5>
              <div className={cx(c.horizonContainer)}>
                <Link to={`${url}/frontiers/h3`}>
                  <div className={c.horizonBox} style={{ height: "100%", background: frontierLevels.includes("H3") ? "#1cab68" : "#fff" }}>
                    <p style={{ color: frontierLevels.includes("H3") ? "#fff" : "#000", right: '17%', transform: 'translateX(50%)' }}>{`${lcs("frontier")} 3`}</p>
                  </div>
                </Link>
                <Link to={`${url}/frontiers/h2`}>
                  <div className={c.horizonBox} style={{ height: "66%", background: frontierLevels.includes("H2") ? "#51A0FB" : "#fff" }}>
                    <p style={{ color: frontierLevels.includes("H2") ? "#fff" : "#000", right: '25%', transform: 'translateX(50%)' }}>{`${lcs("frontier")} 2`}</p>
                  </div>
                </Link>
                <Link to={`${url}/frontiers/h1`}>
                  <div className={c.horizonBox} style={{ height: "33%", background: frontierLevels.includes("H1") ? "#ffc040" : "#fff" }}>
                    <p style={{ color: frontierLevels.includes("H1") ? "#fff" : "#000", right: '50%', transform: 'translateX(50%)' }}>{`${lcs("frontier")} 1`}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* IRL */}
          <div className={cx(c.card)}>
            <div className={cx("card-body")}>
              <h5 className={cx("card-title", c.cardTitle)}>
                {lcs("investment_readiness_levels")}
              </h5>
              <span style={{ color: "#a0a0a0" }}>
                ({lcs("autogenerated")})
              </span>
              <div className={cx("card-text")}>
                <table className={c.irlTable}>
                  <tbody>{renderInvestment()}</tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Prototypes and Metrics */}
          <PrototypeMetrics projectDetails={projectDetailsData} project={project} uploadFile={uploadFile} setProjectDetail={setProjectDetail}/>
          {(hasProjectPermission(project, ["MEMBER"]) || hasProjectPermission(project, ["C_ADMIN"])) &&
            <Export projectDetails={projectDetailsData} project={project} />
          }
        </div>
      </div>

      <Route path={`${path}/trl/:trl_id(\\d+)`} component={() =>
        <Modal match={match} onClose={() => history.push(url)} width={580} height={580}>
          <Trl />
        </Modal>
      }/>
      <Route path={`${path}/fit/:category`} component={() =>
        <Modal match={match} onClose={() => history.push(url)} width={580} height={580}>
          <Fit />
        </Modal>
      }/>
      <Route path={`${path}/frontiers/:category`} component={() =>
        <Modal match={match} onClose={() => history.push(url)} width={580} height={580}>
          <Frontiers />
        </Modal>
      }/>
      <Route path={`${path}/dev_stages/:category`} component={() =>
        <Modal match={match} onClose={() => history.push(url)} width={580} height={580}>
          <DevStages />
        </Modal>
      }/>
      <Route path={`${path}/financial_board`} component={() =>
        <Modal onClose={() => history.push(url)} width={550} height={600}>
          <FinancialBoard projectDetails={projectDetailsData} />
        </Modal>
      }/>
    </div>
  );
}

export default redux(Profile);