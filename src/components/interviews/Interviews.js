import * as React from 'react';
import redux from 'seed/redux';

import cx from "classnames";
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { hasProjectPermission } from 'components/util/Permissions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { lcs } from 'components/util/Locales'
import "resources/bootstrap.min.module.css";
import 'resources/css/interviews/Interviews.css';
import c from 'resources/css/interviews/Interviews.module.css';

import Modal from 'seed/components/helpers/Modal';
import Item from 'components/interviews/Item'
import Form from 'components/interviews/Form'
import Export from 'components/interviews/Export'
import Details from 'components/interviews/Details'


class Interviews extends React.Component
{
  render()
  {
    const { path, url } = this.props.match;
    const { project_id } = this.props.match.params;
    const { optionMenu } = this.state;

    const interviews = this.props.interviews
      .filter(i => i.project_id == project_id)
      .sort((i1, i2) => i2.id - i1.id);
    let project = this.props.projects.filter(p => p.id == project_id)[0];

    const projectId = localStorage.getItem('projectId');
    if (project_id != projectId) this.props.history.replace(`/`)

    const interviewList = interviews.map(i =>
    {
      return (
        <NavLink
          to={`${url}/${i.id}`}
          className={cx(c.item, "list-group-item list-group-item-action flex-column align-items-start active-temp")}
          activeClassName={cx(c.active)}>
          <Item interview={i} />
        </NavLink >)
    });

    const formModal = this.state.formModal ?
      <Modal
        match={this.props.match}
        onClose={this.onModalClose}
        width={750}
        height={650}>
        <Form />
      </Modal> : null;

    const expertsAll = interviews.filter(i => i.interviewee_type == "EXPERT").length;
    const customersAll = interviews.filter(i => i.interviewee_type == "CUSTOMER").length;
    const expertsWeek = interviews.filter(i => i.interviewee_type == "EXPERT" &&
      (new Date(i.created_at)).getTime() > new Date() - (86400000 * 7)).length;
    const customersWeek = interviews.filter(i => i.interviewee_type == "CUSTOMER" &&
      (new Date(i.created_at)).getTime() > new Date() - (86400000 * 7)).length;

    const Empty = () =>
      <div className={cx(c.empty, "container_white container")}>
        <div className={c.emptyText}>{lcs("interview_empty")}</div>
        <div className={c.emptyIcon}><i className="fas fa-microphone-alt"></i></div>
      </div>
    return (
      <div className={"main module"} >
        <div className={"row"}>
          <div className={"col-md-1"}></div>
          <div className={"col-md-10"}>
            <div className={"row  col-md-12 container_status"} style={{paddingRight: "0px"}}>
              <div className={"col-md-2 "}>
                <div className={" container_bar nav justify-content-start"}>
                  <div className={"nav_item nav_title"}>
                    <label style={{ fontSize: "0.9em" }}>{lcs("interviews")}</label>
                  </div>
                </div>
              </div>
              <div className={"container_bar col-md-10"}>
                <div className={"container_bar nav  justify-content-end"}>
                  <div className={"nav_item line"}></div>
                  <div className={'nav_item nav_subtitle'}>
                    <label>{lcs("interviews")}<br /><span style={{ color: "rgba(255,255,255,0.8)", paddingTop: "4px" }}>{lcs("weekly")} / {lcs("totals")}</span></label>
                  </div>
                  <div className={"nav_item"}>
                    <div className={"container_top"}>{lcs("customers")}</div>
                    <div className={"container_bottom"}>
                      <div className={"counter gray_font"}>{customersWeek}/{customersAll}</div>
                    </div>
                  </div>
                  <div className={'nav_item'}>
                    <div className={"container_top"}>{lcs("experts")}</div>
                    <div className={"container_bottom"}>
                      <div className={"counter gray_font"}>{expertsWeek}/{expertsAll}</div>
                    </div>
                  </div>
                  {project != null && hasProjectPermission(project, ["MEMBER"]) ?
                    <i className={c.buttonOption + "  fas fa-ellipsis-v"} onClick={this.openOptionMenu} /> : null
                  }
                  <Menu
                    anchorEl={optionMenu}
                    open={Boolean(optionMenu)}
                    onClose={this.closeOptionMenu}>
                    <MenuItem><Export interviews={interviews} /></MenuItem>
                  </Menu>
                  <div className={''}>&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"row container_t"}>
          <div className={"col-md-1"}></div>
          <div className={"col-md-3"} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <div className={"container_list"}>
              <div className={"container_flex"}>
                <div className={"list-group"} >
                  {project != null && hasProjectPermission(project, ["MEMBER"]) ?
                    <div
                      className={c.newButton}
                      onClick={this.onClickNew}>
                      {lcs("new_interview")}
                    </div> : null
                  }
                  <div className={c.interviewList}>
                    {interviewList}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className={"col-md-7"}>
            <div className={"container_interview col-md-12 "}>
              <Switch>
                <Route
                  path={`${path}/:interview_id(\\d+)`}
                  component={Details} />
                <Route
                  path={`${path}`}
                  component={Empty} />
              </Switch>
            </div>
          </div>
          <div className={"col-md-1"}></div>
        </div>
        {formModal}
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      formModal: false,
    };
    this.openOptionMenu = this.openOptionMenu.bind(this);
    this.closeOptionMenu = this.closeOptionMenu.bind(this);
    this.onClickNew = this.onClickNew.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  componentDidMount()
  {
    const { project_id } = this.props.match.params;
    this.props.getInterviewList({ project: project_id });
    this.props.getProjectDetailList({ project: project_id });
  }

  onClickNew = () =>
  {
    this.setState({
      formModal: true
    });
  }

  onModalClose = () =>
  {
    this.setState({
      formModal: false
    });
  }

  openOptionMenu(e)
  {
    this.setState({ optionMenu: e.currentTarget });
  }

  closeOptionMenu(e)
  {
    this.setState({ optionMenu: null });
  }

}

export default redux(Interviews);
