import { useState, useEffect } from 'react';
import redux from 'seed/redux';

import cx from "classnames";
import { NavLink, Route, Switch } from 'react-router-dom';
import { hasProjectPermission } from 'components/util/Permissions';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { lcs } from 'components/util/Locales'
import c from 'components/interviews/Interviews.module.scss';

import Modal from 'components/helpers/Modal';
import Item from 'components/interviews/Item'
import Form from 'components/interviews/Form'
import Export from 'components/interviews/Export'
import Details from 'components/interviews/Details'

function Interviews(props) {
  const {
    match,
    history,
    interviews = [],
    projects = [],
    getInterviewList,
    getProjectDetailList
  } = props;
  const { path, url } = match;
  const { project_id } = match.params;

  const [formModal, setFormModal] = useState(false);
  const [optionMenu, setOptionMenu] = useState(null);

  
  const filteredInterviews = interviews
    .filter(i => i.project_id === parseInt(project_id))
    .sort((i1, i2) => i2.id - i1.id);

  const project = projects.find(p => p.id === parseInt(project_id));
  
  const projectId = localStorage.getItem('projectId');
  
  if (project_id !== projectId) history.replace(`/`);
  
  const onClickNew = () => setFormModal(true);
  const onModalClose = () => setFormModal(false);

  const openOptionMenu = (e) => setOptionMenu(e.currentTarget);
  const closeOptionMenu = () => setOptionMenu(null);

  const interviewList = filteredInterviews.map((i) => (
    <NavLink
      key={i.id}
      to={`${url}/${i.id}`}
      className={cx(c.item, "list-group-item list-group-item-action flex-column align-items-start active-temp")}
      activeClassName={cx(c.active)}
    >
      <Item interview={i} />
    </NavLink>
  ));

  const formModalElement = formModal && (
    <Modal
      match={match}
      onClose={onModalClose}
      width={750}
      height={650}
    >
      <Form />
    </Modal>
  );
  
  const expertsAll = filteredInterviews.filter(i => i.interviewee_type === "EXPERT").length;
  const customersAll = filteredInterviews.filter(i => i.interviewee_type === "CUSTOMER").length;
  const expertsWeek = filteredInterviews.filter(i => i.interviewee_type === "EXPERT" &&
    (new Date(i.created_at)).getTime() > new Date() - (86400000 * 7)
  ).length;
  const customersWeek = filteredInterviews.filter(i => i.interviewee_type === "CUSTOMER" &&
    (new Date(i.created_at)).getTime() > new Date() - (86400000 * 7)
  ).length;

  const Empty = () => (
    <div className={cx(c.empty, "container_white container")}>
      <div className={c.emptyIcon}>
        <i className="fas fa-microphone-alt" />
      </div>
      <div className={c.emptyText}>
        {lcs("interview_empty")}
      </div>
    </div>
  );

  useEffect(() => {
    getInterviewList({ project: project_id });
    getProjectDetailList({ project: project_id });
  }, [project_id, getInterviewList, getProjectDetailList]);

  return (
    <div className={cx(c.module, "container")} >
      <div className={cx(c.container, 'row justify-content-md-center')}>
        <div className={"col-md-12"}>
          <div className={cx(c.containerStatus)}>
            <div className={cx('row', 'justify-content-between')} style={{paddingInline: '15px', minHeight: '60px',}}>
              <div className={cx("col-md-2", 'd-flex', 'align-items-center', 'justify-content-start')}>
                <div className={cx(c.navItem)}>
                  <h5>{lcs("interviews")}</h5>
                </div>
              </div>
              <div className={cx("col-md-6", 'd-flex', 'align-items-center', 'justify-content-end')}>
                <div className={cx(c.nav, 'd-flex', 'align-items-center')}>
                  <div className={cx(c.navItem, 'd-flex', 'flex-column', 'align-items-center')}>
                    {lcs("interviews")}
                    <br />
                    <span>
                      {lcs("weekly")} / {lcs("totals")}
                    </span>
                  </div>
                  <div className={cx(c.navItem, 'd-flex', 'flex-column', 'align-items-center')}>
                    <span className={cx(c.category)}>{lcs("customers")}</span>
                    <b className={cx(c.counter)}>
                      {customersWeek}/{customersAll}
                    </b>
                  </div>
                  <div className={cx(c.navItem, 'd-flex', 'flex-column', 'align-items-center')}>
                    <span className={cx(c.category)}>{lcs("experts")}</span>
                    <b className={cx(c.counter)}>
                      {expertsWeek}/{expertsAll}
                    </b>
                  </div>
                  {(project != null && hasProjectPermission(project, ["MEMBER"])) &&
                    <i className={cx(c.buttonOption, "fas", "fa-ellipsis-v")} onClick={openOptionMenu} />
                  }
                  <Menu
                    anchorEl={optionMenu}
                    open={Boolean(optionMenu)}
                    onClose={closeOptionMenu}
                  >
                    <MenuItem>
                      <Export interviews={interviews} />
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx(c.container, 'row justify-content-md-center')}>
        <div className={"col-md-3"}>
          <div className={"list-group"} >
            {(project != null && hasProjectPermission(project, ["MEMBER"])) &&
              <button
                className={c.newButton}
                onClick={onClickNew}
              >
                <i className={"fas fa-plus"} />
                <span>{lcs("add_interview")}</span>
              </button>
            }
            <div className={c.interviewList}>
              {interviewList}
            </div>
          </div>
        </div>
        <div className={"col-md-9"}>
          <div>
            <Switch>
              <Route
                path={`${path}/:interview_id(\\d+)`}
                component={Details}
              />
              <Route
                path={`${path}`}
                component={Empty}
              />
            </Switch>
          </div>
        </div>
      </div>
      {formModalElement}
    </div>
  );
}

export default redux(Interviews);
