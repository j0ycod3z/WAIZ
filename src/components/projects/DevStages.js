import React, { useState, useEffect } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import c from "resources/css/projects/DevStages.module.css";
import Loading from "seed/components/helpers/Loading";

function DevStages(props) {
  const { match, devStages: devStagesProp, getDevStageList, getDevStageStatusList, saveDevStageStatus, setDevStageStatus, projectDetails = [], setProjectDetail, onClose } = props;
  const { project_id } = match.params;

  const [statuses, setStatuses] = useState(null);
  const [statusesData, setStatusesData] = useState([]);

  const category = match.params.category.toUpperCase();
  const devStages = devStagesProp.filter((t) => t.category === category);

  let level = 0;
  if (category == "STARTUP") level = 1;
  if (category == "GROW_UP") level = 2;
  if (category == "SCALE_UP") level = 3;
  if (category == "INDUSTRY_MASTER") level = 4;

  const onSelectAll = (values, setValue) => {
    let all = devStages.reduce((tot, f) => (tot &= values[f.id]), true);
    devStages.map((q) => setValue(q.id, !all));
  };

  const onSubmit = (values) => {    
    for (let devStage in values) {
      const status = statusesData.find((s) => s.dev_stage_id == devStage);
      if (status == null) {
        saveDevStageStatus({
          value: values[devStage],
          project_id: project_id,
          dev_stage_id: devStage,
        });
      }
      else setDevStageStatus(status.id, { value: values[devStage] });
    }

    const projectDetail = projectDetails.find((p) => p.project_id == project_id);
    if (projectDetail) {
      
      setProjectDetail(projectDetail.id);
      setTimeout(() => setProjectDetail(projectDetail.id), 10);
    }
    onClose();
  };

  useEffect(() => {
    let isMounted = true;

    getDevStageList({ category });

    getDevStageStatusList({ "dev_stage.category": category, project_id }, (res) => {
      if (!isMounted) return;
      
      let newStatuses = {};
      for (let s of res.body) {
        newStatuses[s.dev_stage_id] = Boolean(s.value);
      }
      setStatuses(newStatuses);
      setStatusesData(res.body.map((s) => ({
        id: s.id,
        dev_stage_id: s.dev_stage_id,
      })));
    });
    
    return () => {
      isMounted = false;
    };
  }, [category, project_id, getDevStageList, getDevStageStatusList]);

  if (statuses == null) return <Loading />;

  return (
    <div className={cx(c.module, "d-flex", "justify-content-md-center")}>
      <div className={cx("col-md-10")}>
        <h3>{`${lcs("level")} ${level}: ${lcs(`development_${level}`)}`}</h3>
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
                {devStages.map((q) =>
                  <label key={q.id} htmlFor={q.id} className={cx("list-group-item")}>
                    <Field type="checkbox" name={q.id} id={q.id} checked={formProps.values[q.id]} />
                    {lc(q.l_name)}
                  </label>
                )}
              </div>
              <br />
              <button type="submit" className={cx("btn", "btn-md", c.buttonPrimary, c.mainButton )}>
                {lcs("save")}
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default redux(DevStages);