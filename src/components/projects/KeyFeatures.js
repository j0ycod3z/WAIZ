import React, { Component } from "react";
import cx from 'classnames';
import { hasProjectPermission } from 'components/util/Permissions';
import { lcs } from 'components/util/Locales';

import 'react-bootstrap';
import c from 'resources/css/projects/Profile.module.css';


class KeyFeatures extends Component
{
  render()
  {
    const { projectDetails = {} } = this.props;

    const features = projectDetails.features
      .sort((f1, f2) => f1.id - f2.id)
      .map((feature, index) =>
      {
        return (
          feature.description != "" && feature.description != null ?
            <tr key={index}>
              <th className={c.keyFeatureNumber}>{index + 1}</th>
              <td className={c.keyFeatureText}>{feature.description}</td>
            </tr> : null
        );
      });

    const featureForm = this.state.projectDetails.features
      .sort((f1, f2) => f1.id - f2.id)
      .map((feature, index) =>
      {
        return (
          <tr key={index}>
            <th className={c.keyFeatureNumber}>{index + 1}</th>
            <td>
              <input
                type="text"
                className={cx("form-control")}
                name={"keyfeature" + index + 1}
                value={feature.description}
                title={index}
                onChange={this.onFeatureChange}
                placeholder="" /></td>
          </tr>
        );
      });

    return (
      <div className={cx("card", c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("key_features")}&nbsp;
            {!this.state.editing && hasProjectPermission(this.props.project, ["MEMBER"]) ?
              <button onClick={this.onClickOpen} className={cx(c.edit)}>
                <i className="fas fa-edit" />
              </button>
              : null}
          </h5>
          <form onSubmit={this.onSubmit}>
            <div className={cx("card-body", c.keyFeaturesTableContainer)}>
              <table
                className={cx(
                  c.keyFeaturesTable,
                  "table",
                  "table-striped"
                )}
              >
                <tbody>
                  {this.state.editing
                    ? featureForm
                    : features}
                </tbody>
              </table>
              {this.state.editing ? (
                <div>
                  <br />
                  <button
                    type="submit"
                    className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button
                    type="button"
                    className={cx("btn", "btn-light")}
                    onClick={this.onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
              ) : (
                  <div />
                )}
            </div>
          </form>
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

    this.onClickOpen = this.onClickOpen.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.onFeatureChange = this.onFeatureChange.bind(this);
  }

  onSubmit = e =>
  {
    e.preventDefault();
    this.setState(prevState => ({
      editing: false,
    }));
    const projectDetails = this.state.projectDetails;
    const features = projectDetails.features;
    features.map((feature, index) =>
    {
      let body = {
        description: feature.description
      };
      const callback = () => this.props.setProjectDetail(feature.project_detail_id, {})
      this.props.setProjectFeature(feature.id, body, callback);
    });
  }

  onFeatureChange = e =>
  {
    let index = parseInt(e.target.title)
    let projectDetails = this.state.projectDetails;
    let feature = projectDetails.features[index];
    feature.description = e.target.value;
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

export default KeyFeatures;
