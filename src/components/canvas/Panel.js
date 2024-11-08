import * as React from "react";
import { Route } from "react-router-dom";

import Modal from "seed/components/helpers/Modal";
import HypothesisForm from "components/canvas_forms/Hypothesis";
import FormPanel from "components/canvas_forms/Panel";
import Canvas from "components/canvas/Canvas";
import Activity from "components/canvas/activity/List";

import c from "resources/css/canvas/Panel.module.css";
import Chatbot from "./Chatbot";

class Panel extends React.Component {
  render() {
    const { path, params } = this.props.match;
    const canvasId = params.canvas_id;

    const activityForm = (props) => (
      <Modal
        {...this.props}
        onClose={this.onModalClose}
        width={600}
        height={600}
      >
        <Activity />
      </Modal>
    );

    const hypothesisForm = (props) => (
      <Modal
        {...this.props}
        onClose={this.onModalClose}
        width={470}
        height={500}
      >
        <HypothesisForm />
      </Modal>
    );

    const panelForm = (props) => (
      <Modal
        {...this.props}
        onClose={this.onModalClose}
        animation={""}
        width={850}
        height={580}
      >
        <FormPanel />
      </Modal>
    );

    return (
      <div className={c.module}>
        <Chatbot />
        <Canvas canvasId={canvasId} />
        <Route
          path={`${path}/add-hypothesis/:area_id`}
          component={hypothesisForm}
        />
        <Route
          path={`${path}/edit-hypothesis/:hypothesis_id`}
          component={hypothesisForm}
        />
        <Route path={`${path}/activity`} component={activityForm} />
        <Route path={`${path}/area/:area_id`} component={panelForm} />
      </div>
    );
  }

  onModalClose = () => {
    const { url } = this.props.match;
    this.props.history.push(url);
  };
}

export default Panel;
