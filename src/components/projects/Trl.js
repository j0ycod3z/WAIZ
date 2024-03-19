import React, { Component } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import "resources/bootstrap.min.module.css";
import c from "resources/css/projects/Trl.module.css";
import Loading from "seed/components/helpers/Loading";

class Trl extends Component
{
  render()
  {
    const { trl_id } = this.props.match.params;

    const { trls = [] } = this.props;
    const { statuses } = this.state;

    const trl = trls.filter(t => t.id == trl_id)[0];

    if (trl == null || statuses == null) return <Loading />

    const trlQuestions =
      this.props.trlQuestions.filter(q => q.trl_id == trl_id)

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
              {/*TODO add level*/}
              <h2>{lcs("level")} {trl.id}</h2>
              <h4>{lc(trl.l_name)}</h4>
              <p>{lc(trl.l_description)}</p>
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
                      {trlQuestions.map(q =>
                        <div className={cx("list-group-item")}>
                          <label>
                            <Field type="checkbox" name={q.id} checked={props.values[q.id]} />
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
    this.onSelectAll = this.onSelectAll.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount()
  {
    const { trl_id, project_id } = this.props.match.params;
    this.props.getTrlQuestionList({ trl: trl_id });

    const callback = res =>
      this.setState(s =>
      {
        let statuses = {}
        for (let s of res.body)
          statuses[s.question_id] = Boolean(s.value)
        return { statuses: statuses, statusesData: res.body.map(s => ({ id: s.id, question_id: s.question_id })) }
      });
    this.props.getTrlStatusList({ "question.trl": trl_id, project_id: project_id }, callback)
  }

  onSelectAll(setValue)
  {
    const { trl_id } = this.props.match.params;
    const trlQuestions =
      this.props.trlQuestions.filter(q => q.trl_id == trl_id)
    trlQuestions.map(q => setValue(q.id, true))
  }

  onSubmit(values, actions)
  {
    let { statusesData } = this.state;
    const { project_id } = this.props.match.params;
    for (let question in values) {
      let status = statusesData.filter(s => s.question_id == question)[0];
      if (status == null) {
        let body = { value: values[question], project_id: project_id, question_id: question }
        this.props.saveTrlStatus(body)
      } else
        this.props.setTrlStatus(status.id, { value: values[question] })
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

export default redux(Trl);
