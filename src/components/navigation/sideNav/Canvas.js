import { useState } from 'react';
import redux from 'seed/redux';

import { NavLink, useLocation } from 'react-router-dom'
import { lcs, lc } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'components/helpers/Modal';

import PhaseSelect from 'components/navigation/PhaseSelect';

import cx from 'classnames';
import c from "components/navigation/sideNav/Canvas.module.scss";

function Canvas(props) {
  const { project, match, setType2, history, } = props;
  const { url } = match;
  const location = useLocation();

  const handleNavClick = (to) => (e) => {
    if (location.pathname === to) {
      e.preventDefault();
    }
  };

  const [phase2Menu, setPhase2Menu] = useState(null);
  // const [phase5Menu, setPhase5Menu] = useState(null);
  const [phaseModal, setPhaseModal] = useState(false);

  const {
    id, canvas, cohort_id, canvas_type2,
    has_phase21, has_phase22, has_phase23, has_phase24, has_phase25,
    has_phase1, has_phase4, has_phase5,
    // has_phase3,
  } = project;

  let type2 = canvas_type2.type;

  let canvas1 = canvas.find((c) => c.type.type === "SYSTEMIC");
  let canvas2 = canvas.find((c) => c.type.type === type2);
  let canvas2s = [];
  
  if (type2 !== "BMC" && has_phase21) canvas2s.push(canvas.find((c) => c.type.type === "BMC"));
  if (type2 !== "BASIC" && has_phase22) canvas2s.push(canvas.find((c) => c.type.type === "BASIC"));
  if (type2 !== "IMPACT" && has_phase23) canvas2s.push(canvas.find((c) => c.type.type === "IMPACT"));
  if (type2 !== "PUBLIC" && has_phase24) canvas2s.push(canvas.find((c) => c.type.type === "PUBLIC"));
  if (type2 !== "BLANK" && has_phase25) canvas2s.push(canvas.find((c) => c.type.type === "BLANK"));
  // let canvas3 = canvas.find(c => c.type.type === "EXO");
  let canvas5 = canvas.find(c => c.type.type === "SCALING");
  
  
  const openPhaseModal = () => setPhaseModal(true);
  const closePhaseModal = () => setPhaseModal(false);
  
  const openPhase2Menu = (e) => setPhase2Menu(e.currentTarget);
  const closePhase2Menu = (e) => {
    const { url } = props.match;
    const typeId = e.currentTarget.title.split("_")[0];
    const canvasId = e.currentTarget.title.split("_")[1];
    
    setPhase2Menu(null);
    
    setType2(id, typeId, () =>
      history.push(`${url}/c/${canvasId}`)
    )
  };

  // const openPhase5Menu = (e) => setPhase5Menu(e.currentTarget);
  // const closePhase5Menu = (e) => {
  //   const { url } = props.match;
  //   const canvasId = e.currentTarget.title.split("_")[1];

  //   setPhase5Menu(false);
  //   history.push(`${url}/c/${canvasId}`)
  // };

  return (
    <div className={c.module}>
      <div className={cx(c.element, c.canvasSection)}>
        <div className={c.sectionTitle}>
          {lcs("phases")}&nbsp;&nbsp;
          {((hasProjectPermission(project, ["MEMBER"]) && cohort_id == null) || (hasProjectPermission(project, ["C_ADMIN"]) && cohort_id != null)) &&
            <i className={"fas fa-ellipsis-h"} style={{ color: "#928daf", cursor: "pointer" }} onClick={openPhaseModal} />}
        </div>
        {has_phase1 &&
          <NavLink
            to={`${url}/c/${canvas1.id}`}
            className={c.navButton}
            activeClassName={c.active}
            onClick={handleNavClick(`${url}/c/${canvas1.id}`)}
          >
            <button className={cx(c.button, c.active)}>1. {lc(canvas1.type.l_name)}</button>
          </NavLink>
        }

        <NavLink
          to={`${url}/c/${canvas2.id}`}
          className={c.navButton}
          activeClassName={c.active}
          onClick={handleNavClick(`${url}/c/${canvas2.id}`)}
        >
          <button className={c.button}>
            2. {lc(canvas2.type.l_name)}
            <i
              className={cx(c.buttonOption, "fas fa-angle-down")}
              onClick={openPhase2Menu}
            />
          </button>
        </NavLink>

        <Menu
          anchorEl={phase2Menu}
          open={Boolean(phase2Menu)}
          onClose={closePhase2Menu}>
          {canvas2s.length > 0 &&
            <MenuItem onClick={closePhase2Menu} title={canvas2s[0].type.id + "_" + canvas2s[0].id}>
              {lc(canvas2s[0].type.l_name)}
            </MenuItem>
          }
          {canvas2s.length > 1 &&
            <MenuItem onClick={closePhase2Menu} title={canvas2s[1].type.id + "_" + canvas2s[1].id}>
              {lc(canvas2s[1].type.l_name)}
            </MenuItem>
          }
          {canvas2s.length > 2 &&
            <MenuItem onClick={closePhase2Menu} title={canvas2s[2].type.id + "_" + canvas2s[2].id}>
              {lc(canvas2s[2].type.l_name)}
            </MenuItem>
          }
          {canvas2s.length > 3 &&
            <MenuItem onClick={closePhase2Menu} title={canvas2s[3].type.id + "_" + canvas2s[3].id}>
              {lc(canvas2s[3].type.l_name)}
            </MenuItem>
          }
        </Menu>
        {/* {has_phase3 &&
          <NavLink
            to={`${url}/c/${canvas3.id}`}
            className={c.navButton}
            activeClassName={c.active}
            onClick={handleNavClick(`${url}/c/${canvas3.id`)}
          >
            <button className={c.button}>3. {lc(canvas3.type.l_name)}</button>
          </NavLink>
        } */}
        {has_phase4 &&
          <NavLink
            to={`${url}/incubation_acceleration`}
            className={c.navButton}
            activeClassName={c.active}
            onClick={handleNavClick(`${url}/incubation_acceleration`)}
          >
            <button className={c.button}>
              3. {lcs("incubation_acceleration")}
            </button>
          </NavLink>
        }
        {has_phase5 &&
          <NavLink
            to={`${url}/c/${canvas5.id}`}
            className={c.navButton}
            activeClassName={c.active}
            onClick={handleNavClick(`${url}/c/${canvas5.id}`)}
          >
            <button className={c.button}>
              4. {lcs("scaling")}
            </button>
          </NavLink>
        }
        {phaseModal &&
          <Modal
            onClose={closePhaseModal}
            width={470}
            height={450}
          >
            <PhaseSelect projectId={id} />
          </Modal>
        }
      </div>
    </div>
  );
}

export default redux(Canvas);