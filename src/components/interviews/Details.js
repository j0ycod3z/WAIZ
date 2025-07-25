import * as React from 'react';
import redux from 'seed/redux';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from 'seed/components/helpers/Loading'
import Insights from 'components/interviews/Insights'
import { hasProjectPermission } from 'components/util/Permissions';

import Modal from 'seed/components/helpers/Modal';
import Form from 'components/interviews/Form'
import { lcs } from 'components/util/Locales'
import "react-bootstrap";
import 'resources/css/interviews/Interviews.css';

import c from 'resources/css/interviews/Details.module.css'


class Details extends React.Component
{
  render()
  {
    const { interviews = [] } = this.props;
    const { interview_id } = this.props.match.params;
    const { optionMenu } = this.state;

    let interview = interviews.filter(p => p.id == interview_id)[0];
    let project = this.props.projects.filter(p => interview != null && p.id == interview.project_id)[0];

    if (interview == null)
      return <Loading />;

    const formModal = this.state.formModal ?
      <Modal
        match={this.props.match}
        onClose={this.onModalClose}
        width={750}
        height={650}>
        <Form interviewId={interview.id} />
      </Modal> : null;

    let type = interview.interviewee_type == "CUSTOMER" ? "customer" : "expert";
    let channel =
      interview.channel = "FACE_TO_FACE" ? "face_to_face" :
        interview.channel == "TELEPHONE" ? "telephone" :
          interview.channel == "VIDEO_CALL" ? "telephone" :
            interview.channel == "EMAIL" ? "email" : "";

    let getTranscript = () =>
    {
      let res = []
      let rows = interview.transcript.split("\n")
      for (let row of rows)
        res.push(<div>{row}<br/></div>)
      return res;
    }

    return (
      <div className={"container_white container"}>
        <div className={"row"}>
          <div className={"col-md-12 header"}>
            {interview.interviewee_name} ({lcs(type)})
            {project != null && hasProjectPermission(project, ["MEMBER"]) ?
              <i className={c.buttonOption + "  fas fa-ellipsis-v"} onClick={this.openOptionMenu} /> : null
            }
            <Menu
              anchorEl={optionMenu}
              open={Boolean(optionMenu)}
              onClose={this.closeOptionMenu}>
              <MenuItem onClick={this.onClickEdit}>{lcs("edit")}</MenuItem>
              <MenuItem onClick={this.onClickDelete}>{lcs("delete")}</MenuItem>
            </Menu>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-md-7 panel"}>

            <div className={"row"}>
              <div className={"col-md-12 "}>
                <div className={"panel_text col-md-12"}>
                  <div className={"d-flex w-100 justify-content-between "} style={{ marginTop: "15px", paddingTop: "10px" }}>
                    <div className={"title"}><b>{lcs("transcript")}</b></div>
                  </div>
                  <div className={"container_flex"}>
                    <div className={"text interview-content"}>
                      {getTranscript()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={"row panel_header"}>
              <div className={"col-md-12"}>
                <div className={"interview-details"}>
                  <div className={"title"} style={{ paddingBottom: "10px" }}><b>{lcs("interviewee_information")}</b></div>
                  <div className={"title"}><b><i class="fas fa-user-alt"></i> {lcs("name")}:</b> {interview.interviewee_name}</div>
                  <div className={"title"}><b><i class="fas fa-briefcase"></i>{lcs("job_role")}:</b> {interview.interviewee_rol}</div>
                  <div className={"title"}><b><i class="fas fa-building"></i>{lcs("company")}:</b> {interview.interviewee_company}</div>
                  <div className={"title"}><b><i class="fas fa-info-circle"></i>{lcs("contact")}:</b> {interview.interviewee_contact}</div>
                  <div className={"title"}><b><i class="fas fa-list"></i>{lcs("category")}:</b> {lcs(type)}</div>
                  <div className={"title"}><b><i class="fas fa-italic"></i>{lcs("type")}:</b> {lcs(channel)}</div>
                </div>

              </div>
            </div>

          </div>
          <div className={"col-md-5 panel"}>
            <div className={"row panel_header"}>
              <div className={"col-md-12"}>
                <div className={"d-flex w-100 justify-content-start"}>
                  <div className={"title"}> {lcs("key_insights")}</div>
                </div>
              </div>
            </div>
            <div className={"row panel_list"} style={{ padding: "0" }}>
              <div className={"col-md-12"} style={{ padding: "0px 15px 0px 0px" }}>
                <div className={"d-flex w-100 item justify-content-start"}>
                  <Insights
                    interviewId={interview.id}
                    projectId={interview.project_id} />
                </div>

              </div>
            </div>

          </div>
        </div>
        {formModal}
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {
      optionMenu: null,
      formModal: false
    };
    this.openOptionMenu = this.openOptionMenu.bind(this);
    this.closeOptionMenu = this.closeOptionMenu.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  componentDidMount()
  {
    const { interview_id } = this.props.match.params;
    this.loadData(interview_id);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.match.params.interview_id !== this.props.match.params.interview_id)
      this.loadData(nextProps.match.params.interview_id);
  }

  loadData(interviewId) 
  {
    this.props.getInterviewDetails({ interview: interviewId })
  }

  openOptionMenu(e)
  {
    this.setState({ optionMenu: e.currentTarget });
  }

  closeOptionMenu(e)
  {
    this.setState({ optionMenu: null });
  }

  onClickEdit()
  {
    this.setState({
      formModal: true
    });
  }

  onClickDelete()
  {
    const { interview_id } = this.props.match.params;
    const callback = () =>
    {
      const { url } = this.props.match
      const backUrl = url.substring(0, url.lastIndexOf('/'));
      this.props.history.push(backUrl);
    }
    this.props.deleteInterview(interview_id, callback)
  }

  onModalClose = () =>
  {
    this.setState({
      formModal: false
    });
  }

}

export default redux(Details);
