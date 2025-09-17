import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import cx from "classnames";

import Invites from "components/project_admin/registry/Invites";
import Registry from "components/project_admin/registry/Registry";

import c from "components/project_admin/registry/Panel.module.scss";

import waizLogo from 'resources/images/waiz_logo_white.svg';
import backSvg from 'resources/images/ic_back.svg';

function Panel(props) {
  const { match, history } = props;
  const { path, url } = match;

  useEffect(() => {
    const userId = sessionStorage.getItem('id');
    if (userId === null || userId === undefined) {
      history.replace('/login');
    }
  }, []);

  const onClickBack = () => {
    history.goBack();
  };

  return (
    <div className={cx(c.module)}>
      <div className={cx("d-flex", "align-items-center", c.jumbotron)}>
        <img src={backSvg} className={c.back} onClick={onClickBack} alt="back" />
        <div className={cx("container")}>
          <img src={waizLogo} className={c.image} alt="canou logo" />
        </div>
      </div>
      <div className={cx("d-flex", "justify-content-md-center")}>
        <div className={cx("col-md-4")}>
          <Switch>
            <Route path={`${path}/:project_id(\\d+)/members`} component={Invites} />
            <Route path={`${path}`} component={Registry} />
            <Redirect to={`${url}`} />
          </Switch>
          </div>
      </div>
    </div>
  );
}

export default Panel;