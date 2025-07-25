import React, { Component } from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { hasProjectPermission } from 'components/util/Permissions';

import 'react-bootstrap';
import styles from 'resources/css/projects/Profile.module.css';


class PrototypeMetrics extends Component
{

  render()
  {
    return (
      <div>{this.state.editing ? this.renderForm() : this.renderCard()}</div>
    );
  }

  renderForm()
  {
    return (
      <div className={cx("card", styles.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title")}>{lcs("prototypes")}&nbsp;</h5>
          <div className={cx("card-text")}>
            <form onSubmit={this.onSubmit}>
              <div className={cx("form-group")}>
                <label htmlFor="highMVP">{lcs("high_fidelity_mvp")}: </label>
                <form encType="multipart/form-data" style={{ padding: "0px" }}>
                  <input
                    type="file"
                    className={cx("form-control-file")}
                    name="file"
                    onChange={this.onHighMVPChange}
                  />
                </form>
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="lowMVP">{lcs("low_fidelity_mvp")}: </label>
                <form encType="multipart/form-data" style={{ padding: "0px" }}>
                  <input
                    type="file"
                    className={cx("form-control-file")}
                    name="file"
                    onChange={this.onLowMVPChange}
                  />
                </form>
              </div>
              <div className={cx("card-text")} />
              <h5 className={cx("card-title")}>{lcs("metrics")}</h5>
              <div className={cx("card-text")}>
                <p>
                  {lcs("validated_by_the_instructor")}&nbsp;&nbsp;&nbsp;
              <input
                    type="checkbox"
                    checked={this.state.projectDetails.validated_by_instructor}
                    onChange={this.onValidatedChange}
                  />
                </p>
              </div>
              <button
                type="submit"
                className={cx("btn", styles.buttonGreen)}>
                {lcs("save_changes")}
              </button>
              <button
                type="button"
                className={cx("btn", "btn-light")}
                onClick={this.onClickCancel}>
                {lcs("cancel")}
              </button>
            </form>
          </div>

        </div>
      </div>
    );
  }

  renderCard()
  {
    return (
      <div className={cx("card", styles.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title")}>
            {lcs("prototypes")}&nbsp;
            {hasProjectPermission(this.props.project, ["MEMBER"]) ?
              <button onClick={this.onClickOpen} className={cx(styles.edit)}>
                <i className="fas fa-edit" />
              </button> : null}
          </h5>
          <div className={cx("card-text")}>
            <p>{lcs("high_fidelity_mvp")}: {this.props.projectDetails.high_prototype ?
              <a href={this.props.projectDetails.high_prototype.url}>{lcs("see_prototype")}</a> : lcs("no_prototype_uploaded")}</p>
            <p>{lcs("low_fidelity_mvp")}: {this.props.projectDetails.low_prototype ?
              <a href={this.props.projectDetails.low_prototype.url}>{lcs("see_prototype")}</a> : lcs("no_prototype_uploaded")}</p>
          </div>
          <div className={cx("card-text")} />
          <h5 className={cx("card-title")}>{lcs("metrics")}</h5>
          <div className={cx("card-text")}>
            <p>
              {lcs("validated_by_the_instructor")}&nbsp;&nbsp;&nbsp;
              <input
                type="checkbox"
                checked={this.props.projectDetails.validated_by_instructor}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      editing: false,
      projectDetails: Object.assign({}, props.projectDetails)
    };

    this.onHighMVPChange = this.onHighMVPChange.bind(this);
    this.onLowMVPChange = this.onLowMVPChange.bind(this);
    this.onValidatedChange = this.onValidatedChange.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = e =>
  {

    e.preventDefault();

    const details = this.state.projectDetails;
    let body = {
      high_prototype_id: details.high_prototype ? details.high_prototype.id : null,
      low_prototype_id: details.low_prototype ? details.low_prototype.id : null,
      validated_by_instructor: details.validated_by_instructor
    };

    this.setState(prevState => ({
      editing: false,
    }));
    this.props.setProjectDetail(details.id, body);
  }

  onHighMVPChange = e =>
  {
    const callback = res =>
    {
      if (!res.ok) return;
      let projectDetails = this.state.projectDetails;
      projectDetails.high_prototype = res.body;
      this.setState({
        projectDetails: projectDetails
      })
    }
    this.props.uploadFile(e.target.form, callback);
  }

  onLowMVPChange = e =>
  {
    const callback = res =>
    {
      if (!res.ok) return;
      let projectDetails = this.state.projectDetails;
      projectDetails.low_prototype = res.body;
      this.setState({
        projectDetails: projectDetails
      })
    }
    this.props.uploadFile(e.target.form, callback);
  }

  onValidatedChange = e =>
  {
    let projectDetails = this.state.projectDetails;
    projectDetails.validated_by_instructor = e.target.checked;
    this.setState({
      projectDetails: projectDetails
    })
  }

  onClickOpen = e =>
  {
    this.setState(prevState => ({
      editing: true
    }));
  }

  onClickCancel = e =>
  {
    this.setState(prevState => ({
      editing: false
    }));
  }
}

export default PrototypeMetrics;