import React, { useEffect, useState } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import c from "components/projects/Fit.module.scss";
import Loading from "components/helpers/Loading";

function Fit(props) {
  const { match, fits, getFitList, getFitStatusList, saveFitStatus, setFitStatus, projectDetails = [], setProjectDetail, onClose } = props;
  const { project_id } = match.params;

  const [statuses, setStatuses] = useState(null);
  const [statusesData, setStatusesData] = useState([]);

  const category = match.params.category.toUpperCase();

  const fitsFiltered = fits.filter((t) => t.category === category);
  
  const categoryMap = {
    "PROBLEM_SOLUTION": 1,
    "PRODUCT_MARKET": 2,
    "BUSINESS_MODEL": 3,
  } 
  const level = categoryMap[category];
  const name = lcs(`fit_${level || 0}`);

  const onSelectAll = (values, setValue) => {
    let all = fitsFiltered.reduce((tot, f) => (tot &= values[f.id]), true);
    fitsFiltered.map((q) => setValue(q.id, !all));
  };

  const onSubmit = (values) => {
    for (let fit in values) {
      const status = statusesData.find((s) => s.fit_id == fit);
      if (status == null) {
        saveFitStatus({
          value: values[fit],
          project_id: project_id,
          fit_id: fit,
        })
      }
      else setFitStatus(status.id, { value: values[fit] })
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
    getFitList({ category });

    getFitStatusList({ "fit.category": category, project_id }, (res) => {
      if (!isMounted) return;

      let statusesObj = {};
      for (let s of res.body) {
        statusesObj[s.fit_id] = Boolean(s.value);
      }
      setStatuses(statusesObj);
      setStatusesData(res.body.map((s) => ({
        id: s.id,
        fit_id: s.fit_id
      })));
    });

    return () => {
      isMounted = false;
    };
  }, [category, project_id, getFitList, getFitStatusList]);

  if (statuses == null) return <Loading />;

  return (
  <div className={cx(c.module, "d-flex", "justify-content-md-center")}>
    <div className={cx("col-md-10")}>
      <h2>{lcs("level")} {level}</h2>
      <h4>{name}</h4>
      <hr />
      <Formik
        initialValues={statuses}
        onSubmit={onSubmit}
        render={formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <div className={cx("form-group")}>
              <p>{lcs("trl_instructions")}</p>
            </div>
            <div className={c.selectAllBtn} onClick={() => onSelectAll(formProps.values, formProps.setFieldValue)}>
              {lcs("mark_all")}
            </div>
            <div className={cx("list-group")}>
              {fitsFiltered.map((q) =>
                <label key={q.id} htmlFor={q.id} className={cx("list-group-item")}>
                  <Field type="checkbox" name={q.id} id={q.id} checked={formProps.values[q.id]}/>
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

export default redux(Fit);