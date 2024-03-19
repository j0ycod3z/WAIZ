import React, { Component } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import "resources/bootstrap.min.module.css";
import c from "resources/css/projects/DevStages.module.css";
import Loading from "seed/components/helpers/Loading";

class DevStages extends Component
{
  render()
  {
    const { statuses } = this.state;

    const category =
      this.props.match.params.category.toUpperCase()
    const devStages =
      this.props.devStages.filter(t => t.category == category);

    let level = 0;
    let name = "";
    if (category == "STARTUP") level = 1;
    if (category == "GROW_UP") level = 2;
    if (category == "SCALE_UP") level = 3;
    if (category == "INDUSTRY_MASTER") level = 4;
    name = lcs("development_" + level);

    if (statuses == null) return <Loading />


    return (
      <div className={c.module}>
        <div className={cx("container")}>
          <div
            className={cx(
              "row",
              c.spacingContainer,
              "justify-content-md-center"
            )}>
            <div className={cx("col-md-9", "col-lg-9")}>
              <h2>{lcs("level")} {level}</h2>
              <h4>{name}</h4>
              <hr />

              <Formik
                initialValues={statuses}
                onSubmit={this.onSubmit}
                render={props => (
                  <form onSubmit={props.handleSubmit}>
                    <div className={cx("form-group")}>
                      <p className={c.question}>
                        {lcs("trl_instructions")}
                      </p>
                    </div>
                    <div className={c.selectAllBtn}
                      onClick={() => this.onSelectAll(props.values, props.setFieldValue)}>
                      <input type="checkbox" checked={devStages.reduce((tot, f) => tot &= props.values[f.id], true)}></input>
                      {lcs("complete_stage")}</div>
                    <div className={c.featureTitle}>{lcs("description")}</div>
                    <div className={cx("list-group")}>
                      {devStages.map(q =>
                        <div className={cx("list-group-item")}>
                          <label>
                            <Field type="checkbox" name={q.id} checked={props.values[q.id]} style={{ display: "none" }} />
                            &nbsp;&nbsp; {lc(q.l_name)}
                          </label>
                        </div>)}
                    </div>
                    <br />

                    <button
                      className={cx(
                        "btn",
                        "btn-md",
                        c.buttonPrimary,
                        c.mainButton
                      )}
                      type="submit"
                    >
                      {lcs("save")}
                    </button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {}
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSelectAll(values, setValue)
  {
    const category =
      this.props.match.params.category.toUpperCase()
    const devStages =
      this.props.devStages.filter(t => t.category == category);
    let all = devStages.reduce((tot, f) => tot &= values[f.id], true);
    devStages.map(q => setValue(q.id, !all))
  }

  componentDidMount()
  {
    const { category, project_id } = this.props.match.params;
    this.props.getDevStageList({ category: category.toUpperCase() });

    const callback = res =>
      this.setState(s =>
      {
        let statuses = {}
        for (let s of res.body)
          statuses[s.dev_stage_id] = Boolean(s.value)
        return { statuses: statuses, statusesData: res.body.map(s => ({ id: s.id, dev_stage_id: s.dev_stage_id })) }
      });
    this.props.getDevStageStatusList({ "dev_stage.category": category.toUpperCase(), project_id: project_id }, callback)
  }



  onSubmit(values, actions)
  {
    let { statusesData } = this.state;
    const { project_id } = this.props.match.params;
    for (let devStage in values) {
      let status = statusesData.filter(s => s.dev_stage_id == devStage)[0];
      if (status == null) {
        let body = { value: values[devStage], project_id: project_id, dev_stage_id: devStage }
        this.props.saveDevStageStatus(body)
      } else
        this.props.setDevStageStatus(status.id, { value: values[devStage] })
    }

    const { projectDetails = [] } = this.props;
    const projectDetail = projectDetails.filter(p => p.project_id == project_id)[0];
    if (projectDetail) {
      this.props.setProjectDetail(projectDetail.id);
      setTimeout(() => this.props.setProjectDetail(projectDetail.id), 1200);
    }
    this.props.onClose();
  }
}

export default redux(DevStages);
