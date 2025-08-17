import React, { useState } from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { hasProjectPermission } from 'components/util/Permissions';

import c from 'resources/css/projects/Profile.module.css';
import c2 from 'resources/css/projects/PrototypesMetrics.module.css';

function PrototypeMetrics(props) {
  const { project, projectDetails: initialDetails, setProjectDetail, uploadFile } = props;

  const [editing, setEditing] = useState(false);
  const [projectDetails, setProjectDetails] = useState({ ...initialDetails });
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    const details = projectDetails;
    console.log(details);
    const body = {
      high_prototype_id: details.high_prototype?.id,
      low_prototype_id: details.low_prototype?.id,
      validated_by_instructor: details.validated_by_instructor,
    };

    setEditing(false);
    setProjectDetail(details.id, body);
  };

  const onHighMVPChange = (e) => {
    const form = e.target.form; 
    uploadFile(form, (res) => {
      if (!res.ok) return;
      setProjectDetails((prev) => ({ ...prev, high_prototype: res.body }));
    });
  };
  const onLowMVPChange = (e) => {
    const form = e.target.form; 
    uploadFile(form, (res) => {
      if (!res.ok) return;
      setProjectDetails((prev) => ({ ...prev, low_prototype: res.body }));
    });
  };
  const onValidatedChange = (e) => {
    const checked = e.target.checked;
    setProjectDetails((prev) => ({ ...prev, validated_by_instructor: checked }));
  };
  
  const onClickOpen = () => setEditing(true);
  const onClickCancel = () => setEditing(false);
  
  const renderForm = () => {
    return (
      <div className={cx(c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>{lcs("prototypes")}</h5>
          <div>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <div className={cx("form-group")}>
                <p>{lcs("high_fidelity_mvp")}: </p>
                <input
                  type="file"
                  className={cx("form-control-file")}
                  name="file"
                  onChange={onHighMVPChange}
                />
              </div>
              <div className={cx("form-group")}>
                <p>{lcs("low_fidelity_mvp")}: </p>
                <input
                  type="file"
                  className={cx("form-control-file")}
                  name="file"
                  onChange={onLowMVPChange}
                />
              </div>
              <h5 className={cx("card-title")}>{lcs("metrics")}</h5>
              <div className={cx(c2.instructor)}>
                <span>{lcs("validated_by_the_instructor")}</span>
                <input
                  type="checkbox"
                  name="validated"
                  id="validated"
                  style={{cursor: 'pointer'}}
                  checked={projectDetails.validated_by_instructor}
                  onChange={onValidatedChange}
                />
              </div>
              <div className={cx(c.btnContainer)}>
                <button type="submit" className={cx("btn", c.buttonGreen)}>
                  {lcs("save_changes")}
                </button>
                <button type="button" className={cx("btn", "btn-light")} onClick={onClickCancel}>
                  {lcs("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = () => {
    return (
      <div className={cx(c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("prototypes")}
            {hasProjectPermission(project, ["MEMBER"]) &&
              <button onClick={onClickOpen} className={cx(c.edit)}>
                <i className="fas fa-edit" />
              </button>
            }
          </h5>
          <div>
            <p>{lcs("high_fidelity_mvp")}: </p>
            <span>
              {projectDetails.high_prototype ?
                <a href={projectDetails.high_prototype.url}>{lcs("see_prototype")}</a> :
                lcs("no_prototype_uploaded")
              }
            </span>
          </div>
          <div>
            <p>{lcs("low_fidelity_mvp")}: </p>
            <span>
              {projectDetails.low_prototype ?
                <a href={projectDetails.low_prototype.url}>{lcs("see_prototype")}</a> :
                lcs("no_prototype_uploaded")
              }
            </span>
          </div>
          <h5 className={cx("card-title", c.cardTitle)}>{lcs("metrics")}</h5>
          <div className={cx(c2.instructor)}>
            <span>{lcs("validated_by_the_instructor")}</span>
            <input type="checkbox" checked={projectDetails.validated_by_instructor} readOnly />
          </div>
        </div>
      </div>
    );
  };

  return <>{editing ? renderForm() : renderCard()}</>;
}

export default PrototypeMetrics;