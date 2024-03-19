import * as React from 'react';
import * as Util from 'seed/util';
import redux from 'seed/redux';

import { NavLink } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'seed/components/helpers/Modal';

import PhaseSelect from 'components/navigation/PhaseSelect'

import c from "resources/css/navigation/sideNav/Canvas.module.css";

class Canvas extends React.Component
{
  render()
  {
    const { url } = this.props.match;
    const { project } = this.props;

    let canvas1 = { type: {}, id: 0 };
    let canvas2 = { type: {}, id: 0 };
    let canvas2s = [
      { type: {}, id: 0 },
      { type: {}, id: 0 },
      { type: {}, id: 0 },
      { type: {}, id: 0 }
    ]
    let canvas3 = { type: {}, id: 0 };
    let canvas5 = { type: {}, id: 0 };

    let type2 = project.canvas_type2.type;

    canvas1 = Util.find(project.canvas, c => c.type.type == "SYSTEMIC");
    canvas2 = Util.find(project.canvas, c => c.type.type == type2);
    canvas2s = [];
    if (type2 != "BMC" && project.has_phase21) canvas2s.push(Util.find(project.canvas, c => c.type.type == "BMC"));
    if (type2 != "BASIC" && project.has_phase22) canvas2s.push(Util.find(project.canvas, c => c.type.type == "BASIC"));
    if (type2 != "IMPACT" && project.has_phase23) canvas2s.push(Util.find(project.canvas, c => c.type.type == "IMPACT"));
    if (type2 != "PUBLIC" && project.has_phase24) canvas2s.push(Util.find(project.canvas, c => c.type.type == "PUBLIC"));
    if (type2 != "BLANK" && project.has_phase25) canvas2s.push(Util.find(project.canvas, c => c.type.type == "BLANK"));
    canvas3 = Util.find(project.canvas, c => c.type.type == "EXO");
    canvas5 = Util.find(project.canvas, c => c.type.type == "SCALING");

    return (
      <div className={c.module}>

        {/* Canvas */}

        <div className={c.element + " " + c.canvasSection}>
          <div className={c.sectionTitle}>{lcs("phases")}&nbsp;&nbsp;
            {hasProjectPermission(project, ["MEMBER"]) && project.cohort_id == null ||
              hasProjectPermission(project, ["C_ADMIN"]) && project.cohort_id != null ?
              <i className={"fas fa-ellipsis-h"} style={{ color: "#928daf", cursor: "pointer" }} onClick={this.openPhaseModal} /> : null}
          </div>

          {project.has_phase1 ?
            <NavLink
              to={`${url}/c/${canvas1.id}`}
              className={c.navButton}
              activeClassName={c.active}>
              <button className={c.button + " " + c.active}>1. {lc(canvas1.type.l_name)}</button>
            </NavLink> : null
          }


          <NavLink
            to={`${url}/c/${canvas2.id}`}
            className={c.navButton}
            activeClassName={c.active}>
            <button className={c.button}>
              2. {lc(canvas2.type.l_name)}
              <div className={c.buttonOption + " fas fa-angle-down"}
                style={{ fontSize: "18px" }}
                onClick={this.openPhase2Menu} />
            </button>
          </NavLink>

          <Menu
            anchorEl={this.state.phase2Menu}
            open={Boolean(this.state.phase2Menu)}
            onClose={this.closePhase2Menu}>
            {canvas2s.length > 0 ?
              <MenuItem onClick={this.closePhase2Menu}
                title={canvas2s[0].type.id + "_" + canvas2s[0].id}>{lc(canvas2s[0].type.l_name)}</MenuItem> : null
            }
            {canvas2s.length > 1 ?
              <MenuItem onClick={this.closePhase2Menu}
                title={canvas2s[1].type.id + "_" + canvas2s[1].id}>{lc(canvas2s[1].type.l_name)}</MenuItem> : null
            }
            {canvas2s.length > 2 ?
              <MenuItem onClick={this.closePhase2Menu}
                title={canvas2s[2].type.id + "_" + canvas2s[2].id}>{lc(canvas2s[2].type.l_name)}</MenuItem> : null
            }
            {canvas2s.length > 3 ?
              <MenuItem onClick={this.closePhase2Menu}
                title={canvas2s[3].type.id + "_" + canvas2s[3].id}>{lc(canvas2s[3].type.l_name)}</MenuItem> : null
            }
          </Menu>

          {project.has_phase3 ?
            <NavLink
              to={`${url}/c/${canvas3.id}`}
              className={c.navButton}
              activeClassName={c.active}>
              <button className={c.button}>3. {lc(canvas3.type.l_name)}</button>
            </NavLink> : null
          }

          {project.has_phase4 ?
            <NavLink
              to={`${url}/incubation_acceleration`}
              className={c.navButton}
              activeClassName={c.active}>
              <button className={c.button}>
                4. {lcs("incubation_acceleration")}
              </button>
            </NavLink> : null
          }

          {project.has_phase5 ?
            <NavLink
              to={`${url}/c/${canvas5.id}`}
              className={c.navButton}
              activeClassName={c.active}>
              <button className={c.button}>
                5. {lcs("scaling")}
              </button>
            </NavLink>
            : null
          }

          {this.state.phaseModal ?
            <Modal
              onClose={this.closePhaseModal}
              width={470}
              height={450}>
              <PhaseSelect
                projectId={project.id} />
            </Modal> : null
          }
        </div>
      </div >
    );
  }


  constructor(props)
  {
    super(props);
    this.state = {
      phase2Menu: null,
      phaseModal: false
    };

    this.openPhase2Menu = this.openPhase2Menu.bind(this);
    this.openPahseModal = this.openPhaseModal.bind(this);
    this.closePhase2Menu = this.closePhase2Menu.bind(this);
    this.closePhaseModal = this.closePhaseModal.bind(this);
  }

  openPhase2Menu = e =>
  {
    this.setState({ phase2Menu: e.currentTarget });
  };

  openPhase5Menu = e =>
  {
    this.setState({ phase5Menu: e.currentTarget });
  };

  openPhaseModal = e =>
  {
    this.setState({ phaseModal: true });
  };

  closePhase2Menu = e =>
  {
    const { url } = this.props.match;
    let typeId = e.currentTarget.title.split("_")[0];
    let canvasId = e.currentTarget.title.split("_")[1];
    this.setState({ phase2Menu: null });

    let callback = () => this.props.history.push(`${url}/c/${canvasId}`)
    this.props.setType2(this.props.project.id, typeId, callback)
  };

  closePhase5Menu = e =>
  {
    const { url } = this.props.match;
    let canvasId = e.currentTarget.title.split("_")[1];
    this.setState({ phase5Menu: false });
    this.props.history.push(`${url}/c/${canvasId}`)
  };

  closePhaseModal = e =>
  {
    this.setState({ phaseModal: false });
  };
}

export default redux(Canvas);
