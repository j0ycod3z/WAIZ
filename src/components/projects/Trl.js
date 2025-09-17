import React, { useState, useEffect } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import c from "components/projects/Trl.module.scss";
import Loading from "components/helpers/Loading";

function Trl(props) {
  const { match, trls = [], trlQuestions, projectDetails = [], getTrlQuestionList, getTrlStatusList, saveTrlStatus, setTrlStatus, setProjectDetail, onClose } = props;
  const { trl_id, project_id } = match.params;

  const [statuses, setStatuses] = useState(null);
  const [statusesData, setStatusesData] = useState([]);

  const trl = trls.find((t) => t.id == trl_id);
  const trlQuestionsFiltered = trlQuestions.filter((q) => q.trl_id == trl_id);

  const onSelectAll = (values, setValue) => {
    let all = trlQuestionsFiltered.reduce((tot, f) => (tot &= values[f.id]), true);
    trlQuestionsFiltered.map((q) => setValue(q.id, !all));
  };

  const onSubmit = (values) => {
    for (let question in values) {
      const status = statusesData.find((s) => s.question_id == question);

      if (status == null) {
        saveTrlStatus({
          value: values[question],
          project_id: project_id,
          question_id: question,
        });
      }
      else setTrlStatus(status.id, { value: values[question] });
    }
    
    const projectDetail = projectDetails.find((p) => p.project_id == project_id);
    if (projectDetail) {
      setProjectDetail(projectDetail.id);
      setTimeout(() => setProjectDetail(projectDetail.id), 100);
    }
    onClose();
  };

  useEffect(() => {
    let isMounted = true;
    
    getTrlQuestionList({ trl: trl_id });

    getTrlStatusList({ "question.trl": trl_id, project_id }, (res) => {
      if (!isMounted) return;

      let statusesObj = {};
      for (let s of res.body){
        statusesObj[s.question_id] = Boolean(s.value);
      }
      setStatuses(statusesObj);
      
      setStatusesData(res.body.map((s) => ({
        id: s.id,
        question_id: s.question_id
      })));
    });
    
    return () => {
      isMounted = false;
    };
  }, [trl_id, project_id, getTrlQuestionList, getTrlStatusList, setStatuses, setStatusesData]);

  if (trl == null || statuses == null) return <Loading />;
  
  return (
    <div className={cx(c.module, "d-flex", "justify-content-md-center")}>
      <div className={cx("col-md-10")}>
        {/*TODO add level*/}
        <h2>{lcs("level")} {trl.id}</h2>
        <h4>{lc(trl.l_name)}</h4>
        <p>{lc(trl.l_description)}</p>
        <hr />
        <Formik
          initialValues={statuses}
          onSubmit={onSubmit}
          render={formProps => (
            <form onSubmit={formProps.handleSubmit}>
              <div className={cx("form-group")}>
                <p>{lcs("trl_instructions")}</p>
              </div>
              <div className={c.selectAllBtn} onClick={(e) => {e.preventDefault(); onSelectAll(formProps.values, formProps.setFieldValue)}}>
                {lcs("mark_all")}
              </div>
              <div className={cx("list-group")}>
                {trlQuestionsFiltered.map((q) =>
                  <label key={q.id} htmlFor={q.id} className={cx("list-group-item")}>
                    <Field type="checkbox" name={q.id} id={q.id} checked={formProps.values[q.id]} />
                    {lc(q.l_name)}
                  </label>
                )}
              </div>
              <br />
              <button className={cx("btn", "btn-md", c.buttonPrimary, c.mainButton)} type="submit">
                {lcs("save")}
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default redux(Trl);