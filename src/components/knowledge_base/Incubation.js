import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { lcs } from "components/util/Locales"

import Modal from 'seed/components/helpers/Modal';
import KnowledgeBase from 'components/knowledge_base/Panel'
import c from "resources/css/knowledge_base/Incubation.module.css";
import "react-bootstrap";

function Incubation(props) {
  const { match } = props;
  const { path, url } = match;

  const knowledgeBase = (routeProps) =>
    <KnowledgeBase
      {...routeProps}
      showMenu={false}
    />;

  return (
    <div className={c.module}>
      <Switch>
        <Route
          path={`${path}/:course_id(\\d+)`}
          component={knowledgeBase}
        />
        <Redirect to={`${url}/3/0`} />
      </Switch>
    </div >
  );
}

export default Incubation;