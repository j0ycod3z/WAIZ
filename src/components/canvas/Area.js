import * as React from "react";
import $ from "jquery";
import cx from "classnames";
import redux from "seed/redux";
import { Link } from "react-router-dom";
import { useDrop } from "react-dnd";
import { lc, lcs } from "components/util/Locales";
import { hasProjectPermission } from "components/util/Permissions";

import Hypothesis from "components/canvas/Hypothesis";
import Modal from "seed/components/helpers/Modal";
import AreaForm from "components/canvas_forms/Area";

import c from "resources/css/canvas/Area.module.css";

import { CHATBOT } from "settings/Config";
import { useState } from "react";
import ModalBot from "./ModalBot";
import { text } from "body-parser";
import { dumpTextGen, textGeneration } from "./GenerateText";
import Hypotheses from "actions/hypotheses";
let area38hypo = ""
class Area extends React.Component {

  render() {
    const { area = {}, hypothesis = [] } = this.props;
    const { maxHypothesis } = this.props;
    const { showAreaForm, modal } = this.state;
    const { url } = this.props.match;
    let name = area.l_name ? area.l_name : {};
    

    const hypothesisS = hypothesis
      .sort((h1, h2) => h2.id - h1.id)
      .filter((h) => h.is_active);
     
    // TODO: Locate My Project
   
     if (hypothesis[0] && hypothesis[0].area_id === 38) {
      area38hypo = String(hypothesis[0].text);
      
     }

    const numHypothesis = hypothesisS.length;

    // TODO : Project ID here
    let projectId = localStorage.getItem("projectId");
    const project = this.props.projects.filter((p) => p.id == projectId)[0];

    if (project == null) return <div></div>;
    const hypothesisList = hypothesisS.map((h) =>
      h.is_active ? (
        <div className={c.item}>
          <Hypothesis
            area={area}
            hypothesis={h}
            project={project}
            selectedColor={this.props.selectedColor}
            setSelectedColor={this.props.setSelectedColor}
            match={this.props.match}
          />
        </div>
      ) : null
    );

    const numH =
      maxHypothesis != null ? (
        <span className={c.numH}>{`(${numHypothesis}/${maxHypothesis})`}</span>
      ) : null;

    return (
      <div
        className={c.module}
        // onMouseEnter={this.showOptions}
        // onMouseLeave={this.hideOptions}
        onClick={this.onClick}
      >
        <div className={c.options}>
          {area.category.startsWith("BLANK") &&
            hasProjectPermission(project, ["MEMBER"]) ? (
            <div
              onClick={this.showAreaForm}
              className={cx(c.edit, c.option, "fas fa-pencil-alt")}
            ></div>
          ) : null}
          {(maxHypothesis == null || numHypothesis < maxHypothesis) &&
            hasProjectPermission(project, ["MEMBER"]) ? (
            <Link to={`${url}/add-hypothesis/${area.id}`}>
              <div className={cx(c.add, c.option, "fas fa-plus")}></div>
            </Link>
          ) : null}
          {!area.category.startsWith("BLANK") ? (
            <Link to={`${url}/area/${area.id}/help`}>
              <div className={cx(c.info, c.option, "fas fa-question")}></div>
            </Link>
          ) : null}
          <Link to={`${url}/area/${area.id}/insights`}>
            <div className={cx(c.insight, c.option, "fas fa-lightbulb")}></div>
          </Link>

          {/* //TODO Here is the something */}
          {/* projectId, area.id, hypothesisS[0]) */}
          {/* <Link
            onClick={() => {
              // this.toggleModal(); 
                dumpTextGen(projectId, area, hypothesis, area38hypo);
            }}
          >
            <div>
              <div className={cx(c.bot, c.option, "fas fa-robot")}></div>
            </div>
          </Link> */}
        </div>

        <div className={c.title}>
          {area.category.startsWith("BLANK") && name.ref == "" ? (
            <i onClick={this.showAreaForm}>{lcs("write_a_name")}</i>
          ) : (
            <Link to={`${url}/area/${area.id}`}>
              {area.category.startsWith("BLANK") ? name.ref : lc(name)}
            </Link>
          )}{" "}
          {numH}
        </div>
        {/* Hypothesis List */}
        <div className={c.container}>{hypothesisList}</div>

        {showAreaForm ? (
          <Modal
            match={this.props.match}
            onClose={this.closeAreaForm}
            width={400}
            height={400}
          >
            <AreaForm area={area} />
          </Modal>
        ) : null}
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      showAreaForm: false,
      modal: false,
    };
    this.showAreaForm = this.showAreaForm.bind(this);
    // this.showOptions = this.showOptions.bind(this);
    // this.hideOptions = this.hideOptions.bind(this);
    this.closeAreaForm = this.closeAreaForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };


  showAreaForm() {
    this.setState({
      showAreaForm: true,
    });
  }

  closeAreaForm() {
    this.setState({
      showAreaForm: false,
    });
  }

  showOptions = (e) =>
    $(e.currentTarget)
      .find("." + c.options)
      .fadeIn();

  hideOptions = (e) => {
    $(e.currentTarget)
      .find("." + c.options)
      .fadeOut();
  };
}

const DndWrapper = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "HYPOTHESIS",
    drop: () => ({ name: props.area }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "#fff";
  if (isActive) {
    backgroundColor = "#fff";
  } else if (canDrop) {
    backgroundColor = "#fafafa";
  }
  return (
    <div ref={drop} style={{ backgroundColor, height: "100%" }}>
      <Area {...props} />
    </div>
  );
};

export default redux(DndWrapper);
