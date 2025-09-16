import * as React from "react";
import { Route } from "react-router-dom";

import Modal from "seed/components/helpers/Modal";
import HypothesisForm from "components/canvas_forms/Hypothesis";
import FormPanel from "components/canvas_forms/Panel";
import Canvas from "components/canvas/Canvas";
import Activity from "components/canvas/activity/List";

import c from "components/canvas/Panel.module.scss";
import Chatbot from "./Chatbot";

function Panel(props) {
  const {
    path,
    params,
    url,
  } = props.match;
  const canvasId = params.canvas_id;

  const onModalClose = () => {
    props.history.push(url);
  };

  const activityForm = () => (
    <Modal {...props} onClose={onModalClose} width={600} height={600}>
      <Activity />
    </Modal>
  );

  const hypothesisForm = () => (
    <Modal {...props} onClose={onModalClose} width={470} height={500}>
      <HypothesisForm />
    </Modal>
  );

  const panelForm = () => (
    <Modal {...props} onClose={onModalClose} animation={""} width={850} height={580}>
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

export default Panel;
