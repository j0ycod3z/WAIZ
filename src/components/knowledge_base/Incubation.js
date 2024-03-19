import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { lcs } from "components/util/Locales"

import Modal from 'seed/components/helpers/Modal';
import KnowledgeBase from 'components/knowledge_base/Panel'
import c from "resources/css/knowledge_base/Incubation.module.css";
import "resources/bootstrap.min.module.css";

class Incubation extends Component
{
  render()
  {
    const { path, url } = this.props.match;

    const knowledgeBase = props =>
      <KnowledgeBase
        {...props}
        showMenu={false} />


    return (
      <div className={c.module}>
        <div style={{paddingTop: "30px"}}></div>
        <Switch>
          <Route
            path={`${path}/:course_id(\\d+)`}
            component={knowledgeBase} />
          <Redirect to={`${url}/3/0`} />
        </Switch>
      </div >
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      showFinancial: false
    };
    this.openFinancial = this.openFinancial.bind(this);
    this.closeFinancial = this.closeFinancial.bind(this);
  }

  openFinancial()
  {
    this.setState({
      showFinancial: true
    })
  }

  closeFinancial()
  {
    this.setState({
      showFinancial: false
    })
  }
}

export default Incubation;