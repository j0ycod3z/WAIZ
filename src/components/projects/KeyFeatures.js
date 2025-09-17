import React, { useState, useMemo } from "react";
import cx from 'classnames';
import { hasProjectPermission } from 'components/util/Permissions';
import { lcs } from 'components/util/Locales';

import c from 'components/projects/Profile.module.scss';
import c2 from 'components/projects/KeyFeatures.module.scss';

function KeyFeatures(props) {
  const { projectDetails: projectDetailsProp = {}, project, setProjectFeature, setProjectDetail } = props;

  const [editing, setEditing] = useState(false);
  const [projectDetails, setProjectDetails] = useState({ ...projectDetailsProp });


  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);

    (projectDetails.features || []).forEach((feature) => {
      let body = { description: feature.description };
      const callback = () => setProjectDetail(feature.project_detail_id, {});
      setProjectFeature(feature.id, body, callback);
    });
  };

  const onFeatureChange = (e) => {
    const index = parseInt(e.target.title);
    const value = e.target.value;

    setProjectDetails((prev) => {
      const updated = { ...prev };
      const featuresCopy = [...updated.features];
      featuresCopy[index] = { ...featuresCopy[index], description: value };
      updated.features = featuresCopy;
      return updated;
    });
  };
  
  const onClickOpen = () => setEditing(true);
  const onClickCancel = () => setEditing(false);

  const features = useMemo(() => (
    <ol className={cx(c.orderedList)}>{
      (projectDetailsProp.features || []).sort((f1, f2) => f1.id - f2.id)
      .map((feature) => (feature.description != "" && feature.description != null) && (
        <li key={feature.id}>
          <span>{feature.description}</span>
        </li>
      ))
    }</ol>
  ), [projectDetailsProp.features]);

  const featureForm = useMemo(() => (
    <form onSubmit={onSubmit}>
      <ol className={cx(c.orderedList, c2.formList)}>{
        (projectDetails.features || [])
        .sort((f1, f2) => f1.id - f2.id)
        .map((feature, i) => (
          <li key={feature.id}>
            <input
              type="text"
              className={cx("form-control")}
              name={`keyfeature${i + 1}`}
              value={feature.description}
              title={i}
              onChange={(e) => onFeatureChange(e)}
              placeholder=""
            />
          </li>
        ))
      }</ol>
      <div className={cx(c.btnContainer)}>
        <button type="submit" className={cx("btn", c.buttonGreen)}>
          {lcs("save_changes")}
        </button>
        <button type="button" className={cx("btn", "btn-light")} onClick={onClickCancel}>
          {lcs("cancel")}
        </button>
      </div>
    </form>
  ), [projectDetails.features]);

  return (
    <div className={cx(c.card)}>
      <div className={cx("card-body")}>
        <h5 className={cx("card-title", c.cardTitle)}>
          {lcs("key_features")}
          {(!editing && hasProjectPermission(project, ["MEMBER"])) &&
            <button onClick={onClickOpen} className={cx(c.edit)}>
              <i className="fas fa-edit" />
            </button>
          }
        </h5>
        {editing ? featureForm : features}
      </div>
    </div>
  );
}

export default KeyFeatures;