import React, { useState, useEffect } from "react";
import redux from 'seed/redux';

import { lcs, lc } from 'components/util/Locales';
import { Formik, Field } from "formik";

import cx from "classnames";

import c from "components/projects/Frontiers.module.scss";
import Loading from "components/helpers/Loading";

function Frontiers(props) {
  const { match, frontiers, getFrontierList, getFrontierStatusList, saveFrontierStatus, setFrontierStatus, projectDetails = [], setProjectDetail, onClose } = props;
  const { category, project_id } = match.params;

  const [statuses, setStatuses] = useState(null);
  const [statusesData, setStatusesData] = useState([]);

  const upperCategory = category.toUpperCase();
  const filteredFrontiers = frontiers.filter((t) => t.category == upperCategory);

  let name = "";
  if (upperCategory == "H1") name = `${lcs("frontier")} 1`;
  if (upperCategory == "H2") name = `${lcs("frontier")} 2`;
  if (upperCategory == "H3") name = `${lcs("frontier")} 3`;

  const onSelectAll = (values, setValue) => {
    let all = filteredFrontiers.reduce((tot, f) => (tot &= values[f.id]), true);
    filteredFrontiers.map((q) => setValue(q.id, !all));
  };

  const onSubmit = (values) => {
    for (let frontier in values) {
      
      const status = statusesData.find((s) => s.frontier_id == frontier);
      if (status == null) {
        saveFrontierStatus({
          value: values[frontier],
          project_id: project_id,
          frontier_id: frontier,
        });
      }
      else setFrontierStatus(status.id, { value: values[frontier] });
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
    getFrontierList({ category: upperCategory });

    getFrontierStatusList({ "frontier.category": upperCategory, project_id }, (res) => {
      if (!isMounted) return;

      let newStatuses = {};
      for (let s of res.body) {
        newStatuses[s.frontier_id] = Boolean(s.value);
      }
      setStatuses(newStatuses);
      setStatusesData(res.body.map((s) => ({ id: s.id, frontier_id: s.frontier_id })));
    });

    return () => {
      isMounted = false;
    };
  }, [upperCategory, project_id, getFrontierList, getFrontierStatusList]);

  if (statuses == null) return <Loading />;

  return (
    <div className={cx(c.module, "d-flex", "justify-content-md-center")}>
      <div className={cx("col-md-10")}>
        <h3>{name}</h3>
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
                {filteredFrontiers.map((q) =>
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

export default redux(Frontiers);