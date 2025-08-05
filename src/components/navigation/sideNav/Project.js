import { useState } from 'react';
import redux from 'seed/redux';

import { NavLink } from 'react-router-dom'
import { lcs } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';

import Modal from 'seed/components/helpers/Modal';
import InterviewForm from 'components/interviews/Form';

import c from "resources/css/navigation/sideNav/Project.module.css";

function SideNav(props) {
  const { project, match } = props;
  const { url } = match;

  const [interviewModal, setInterviewModal] = useState(false);

  const openInterviewModal = () => setInterviewModal(true);
  const closeInterviewModal = () => setInterviewModal(false);

  return (
    <div className={c.module}>
      <div className={c.element}>
        <div className={c.sectionTitle}>{lcs("project")}</div>
        <NavLink
          to={`${url}/project_profile/${project.id}`}
          className={c.navButton}
          activeClassName={c.active}
        >
          <button className={c.button}>
            <i className="fas fa-th-large" />
            &nbsp;&nbsp;&nbsp;{lcs("project_profile")}
          </button>
        </NavLink>
        <NavLink
          to={`${url}/interviews/${project.id}`}
          className={c.navButton}
          activeClassName={c.active}
        >
          <button className={c.button}>
            <i className="fas fa-microphone-alt" />
            &nbsp;&nbsp;&nbsp;{lcs("interviews")}
            {hasProjectPermission(project, ["MEMBER"]) &&
              <i className={c.buttonOption + " fas fa-plus"} onClick={openInterviewModal} />
            }
          </button>
        </NavLink>
        <NavLink
          to={`${url}/dashboards`}
          className={c.navButton}
          activeClassName={c.active}
        >
          <button className={c.button}>
            <i className="fas fa-chart-line" />
            &nbsp;&nbsp;&nbsp;{lcs("dashboards")}
          </button>
        </NavLink>
  
        {interviewModal &&
          <Modal
            match={match}
            onClose={closeInterviewModal}
            width={750}
            height={650}>
            <InterviewForm projectId={project.id} />
          </Modal>
        }
      </div>
    </div>
  );
}

export default redux(SideNav);
