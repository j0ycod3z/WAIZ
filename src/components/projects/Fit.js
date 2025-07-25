import React, { Component } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import "react-bootstrap";
import c from "resources/css/projects/Fit.module.css";
import Loading from "seed/components/helpers/Loading";

class Fit extends Component
{
  render()
  {
    const { statuses } = this.state;

    const category =
      this.props.match.params.category.toUpperCase()
    const fits =
      this.props.fits.filter(t => t.category == category);

    let level = 0;
    if (category == "PROBLEM_SOLUTION") level = 1;
    if (category == "PRODUCT_MARKET") level = 2;
    if (category == "BUSINESS_MODEL") level = 3;
    let name = lcs("fit_" + level);

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
                      onClick={() => this.onSelectAll(props.setFieldValue)}>{lcs("mark_all")}</div>
                    <div className={cx("list-group")}>
                      {fits.map(q =>
                        <div className={cx("list-group-item")}>
                          <label>
                            <Field type="checkbox" name={q.id} checked={props.values[q.id]}/>
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

  componentDidMount()
  {
    const { category, project_id } = this.props.match.params;
    this.props.getFitList({ category: category.toUpperCase() });

    const callback = res =>
      this.setState(s =>
      {
        let statuses = {}
        for (let s of res.body)
          statuses[s.fit_id] = Boolean(s.value)
        return { statuses: statuses, statusesData: res.body.map(s => ({ id: s.id, fit_id: s.fit_id })) }
      });
    this.props.getFitStatusList({ "fit.category": category.toUpperCase(), project_id: project_id }, callback)
  }

  onSelectAll(setValue)
  {
    const { category } = this.props.match.params;
    const fits = this.props.fits.filter(t => t.category == category.toUpperCase());
    fits.map(q => setValue(q.id, true))
  }

  onSubmit(values, actions)
  {
    let { statusesData } = this.state;
    const { project_id } = this.props.match.params;
    for (let fit in values) {
      let status = statusesData.filter(s => s.fit_id == fit)[0];
      if (status == null) {
        let body = { value: values[fit], project_id: project_id, fit_id: fit }
        this.props.saveFitStatus(body)
      } else
        this.props.setFitStatus(status.id, { value: values[fit] })
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

export default redux(Fit);
