import * as React from 'react';
import redux from 'seed/redux';

import { NavLink } from 'react-router-dom'
import { lcs } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';

import Modal from 'seed/components/helpers/Modal';
import InterviewForm from 'components/interviews/Form';

import c from "resources/css/navigation/sideNav/Project.module.css";

class SideNav extends React.Component
{
  render()
  {
    const { url } = this.props.match;
    const { project } = this.props;

    return (
      <div className={c.module}>
        {/* Sections */}

        <div className={c.element}>
          <div className={c.sectionTitle}>{lcs("details")}</div>
          <NavLink
            to={`${url}/project_profile/${project.id}`}
            className={c.navButton}
            activeClassName={c.active}>
            <button className={c.button}>
              <i className="fas fa-th-large" />
              &nbsp;&nbsp;&nbsp;{lcs("project_profile")}
            </button>
          </NavLink>

          <NavLink
            to={`${url}/interviews/${project.id}`}
            className={c.navButton}
            activeClassName={c.active}>
            <button className={c.button}>
              <i className="fas fa-microphone-alt" />
              &nbsp;&nbsp;&nbsp;{lcs("interviews")}
              {hasProjectPermission(project, ["MEMBER"]) ?
                <i className={c.buttonOption + " fas fa-plus"}
                  onClick={this.openInterviewModal} /> : null
              }
            </button>
          </NavLink>

          {this.state.interviewModal ?
            <Modal
              match={this.props.match}
              onClose={this.closeInterviewModal}
              width={750}
              height={650}>
              <InterviewForm projectId={project.id} />
            </Modal> : null}

          <NavLink
            to={`${url}/dashboards`}
            className={c.navButton}
            activeClassName={c.active}>
            <button className={c.button}>
              <i className="fas fa-chart-line" />
              &nbsp;&nbsp;&nbsp;{lcs("dashboards")}
            </button>
          </NavLink>

        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      interviewModal: false
    };

    this.openInterviewModal = this.openInterviewModal.bind(this);
    this.closeInterviewModal = this.closeInterviewModal.bind(this);
  }

  openInterviewModal = e =>
  {
    this.setState({ interviewModal: true });
  };

  closeInterviewModal = e =>
  {
    this.setState({ interviewModal: false });
  };

}

export default redux(SideNav);
