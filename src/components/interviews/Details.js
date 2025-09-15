import React, { useState } from 'react';
import redux from 'seed/redux';
import cx from 'classnames';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from 'seed/components/helpers/Loading'
import Insights from 'components/interviews/Insights'
import { hasProjectPermission } from 'components/util/Permissions';

import Modal from 'seed/components/helpers/Modal';
import Form from 'components/interviews/Form'
import { lcs } from 'components/util/Locales'

import c from 'resources/css/interviews/Details.module.css'

function Details(props) {
  const { 
    interviews = [], 
    projects = [], 
    match, 
    history,  
    deleteInterview 
  } = props;

  const { interview_id } = match.params;

  const [optionMenu, setOptionMenu] = useState(null);
  const [formModal, setFormModal] = useState(false);

  
  const interview = interviews.find((p) => p.id === parseInt(interview_id));
  const project = projects.find((p) => interview && p.id === interview.project_id);

  const openOptionMenu = (e) => setOptionMenu(e.currentTarget);
  const closeOptionMenu = () => setOptionMenu(null);

  const onClickEdit = () => {
    closeOptionMenu();
    setFormModal(true)
  };
  const onClickDelete = () => {
    deleteInterview(interview_id, () => {
      const { url } = match;
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      history.push(backUrl);
    });
    closeOptionMenu();
  };

  const onModalClose = () => setFormModal(false);
  
  if (interview === null || interview === undefined) return <Loading />;

  const formModalElement = formModal && (
    <Modal
      match={match}
      onClose={onModalClose}
      width={750}
      height={650}
    >
      <Form interviewId={interview.id} />
    </Modal>
  );
  
  const type = lcs(interview.interviewee_type.toLowerCase());
  const channel = lcs(interview.channel.toLowerCase());
  
  const getTranscript = () => {
    const rows = interview.transcript.split("\n");
    return rows.map((row, idx) => (
      <div key={idx}>
        {row}<br />
      </div>
    ));
  };
  
  return (
    <div className={cx(c.container, 'container')}>
      <div className={"row"}>
        <div className={cx(c.header, "col-md-12")}>
          {interview.interviewee_name} ({type})
          {(project != null && hasProjectPermission(project, ["MEMBER"])) &&
            <i className={c.buttonOption + "  fas fa-ellipsis-v"} onClick={openOptionMenu} />
          }
          <Menu
            anchorEl={optionMenu}
            open={Boolean(optionMenu)}
            onClose={closeOptionMenu}
          >
            <MenuItem onClick={onClickEdit}>{lcs("edit")}</MenuItem>
            <MenuItem onClick={onClickDelete}>{lcs("delete")}</MenuItem>
          </Menu>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-sm-7"}>
          <div className={"d-flex w-100 justify-content-between "}>
            <b className={cx(c.title)}>{lcs("transcript")}</b>
          </div>
          <div className={c.transcript}>
            {getTranscript()}
          </div>
          <div className={c.interviewDetails}>
            <div><b>{lcs("interviewee_information")}</b></div>
            <div><b><i className="fas fa-user-alt"></i> {lcs("name")}:</b> {interview.interviewee_name}</div>
            <div><b><i className="fas fa-briefcase"></i>{lcs("job_role")}:</b> {interview.interviewee_rol}</div>
            <div><b><i className="fas fa-building"></i>{lcs("company")}:</b> {interview.interviewee_company}</div>
            <div><b><i className="fas fa-info-circle"></i>{lcs("contact")}:</b> {interview.interviewee_contact}</div>
            <div><b><i className="fas fa-list"></i>{lcs("category")}:</b> {type}</div>
            <div><b><i className="fas fa-italic"></i>{lcs("type")}:</b> {lcs(channel)}</div>
          </div>
        </div>
        <div className={cx("col-sm-5")}>
          <div className={"d-flex w-100 justify-content-start"}>
            <b className={cx(c.title)}>{lcs("key_insights")}</b>
          </div>
          <div className={"d-flex w-100 item justify-content-start"}>
            <Insights
              interviewId={interview.id}
              projectId={interview.project_id}
            />
          </div>
        </div>
      </div>
      {formModalElement}
    </div>
  );
}

export default redux(Details);
