import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import cx from "classnames";

import Invites from "components/project_admin/registry/Invites";
import Registry from "components/project_admin/registry/Registry";

import c from "resources/css/project_admin/registry/Panel.module.css";
import "resources/bootstrap.min.module.css";

class Panel extends Component
{
  render()
  {
    const { path, url } = this.props.match;

    return (
      <div className={cx(c.module)}>

        <div className={cx("jumbotron", "jumbotron-fluid", c.jumbotron)}>
          <img src={require("resources/images/ic_back.svg")} className={c.back} onClick={this.onClickBack}></img>
          <div className={cx("container")}>
            <img
              src={require("resources/images/canou_logo.svg")}
              className={c.image}
              alt="canou logo" />
          </div>
        </div>

        <div className={cx("container")}>
          <div
            className={cx(
              "row",
              c.spacingContainer,
              "justify-content-md-center"
            )}>
            <div className={cx("col-lg-5", "col-md-6")}>
              <br />
              <Switch>
                <Route path={`${path}/:project_id(\\d+)/members`}
                  component={Invites} />
                <Route path={`${path}`}
                  component={Registry} />
                <Redirect to={`${url}`} />
              </Switch>
             </div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onClickBack = this.onClickBack.bind(this);
  }

  componentDidMount()
  {
    const userId = sessionStorage.getItem('id');
    if (userId == null)
      return this.props.history.replace('/login');
  }

  onClickBack()
  {
    this.props.history.goBack();
  }
}

export default Panel;
