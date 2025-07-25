import * as React from 'react';
import redux from 'seed/redux';

import cx from "classnames";
import { lcs } from 'components/util/Locales'
import { Formik, Field } from 'formik';
import Loading from 'seed/components/helpers/Loading'
import Insights from 'components/interviews/Insights'

import "react-bootstrap";
import 'resources/css/interviews/Interviews.css';

import c from 'resources/css/interviews/Form.module.css'


class Form extends React.Component
{
  render()
  {
    const { interview } = this.state;

    if (interview == null) return <Loading />;
   
    return (
      <div className={"module"}>
        <div className={"container_interview"}>
          <div className={"container_white container"}>
            <div className={"row"}>
              <div className={"col-md-12 header"}>
                {lcs("interview")}
              </div>
            </div>
            <div className={"row"}>
              <div className={"col-md-7 panel"}>

                <div className={"row"}>
                  <div className={"col-md-12"} style={{ padding: "0" }}>
                    <div className={"panel_text col-md-12"}>
                      <Formik
                        initialValues={interview}
                        validate={this.onValidate}
                        onSubmit={this.onSubmit}>
                        {({
                          values, errors, setFieldValue, handleSubmit
                        }) => (

                            <form className={c.form} onSubmit={handleSubmit}>

                              <div className={c.label}>{lcs("transcript")}</div>
                              <Field name="transcript" component="textarea" className={c.transcript} />

                              <div className={c.label}>{lcs("interviewee_information")}</div>

                              <Field name="interviewee_name" type="text" placeholder={lcs("name")} />
                              <Field name="interviewee_rol" type="text" placeholder={lcs("job")} />
                              <Field name="interviewee_company" type="text" placeholder={lcs("company")} />
                              <Field name="interviewee_contact" type="text" placeholder={lcs("contact")} />
                              <Field name="interviewee_type" component="select" required>
                                <option value="">{lcs("interviewee_type")}</option>
                                <option value="CUSTOMER">{lcs("customer")}</option>
                                <option value="EXPERT">{lcs("expert")}</option>
                              </Field>
                              <Field name="channel" component="select" required>
                                <option value="">{lcs("interview_method")}</option>
                                <option value="FACE_TO_FACE">{lcs("face_to_face")}</option>
                                <option value="TELEPHONE">{lcs("telephone")}</option>
                                <option value="VIDEO_CALL">{lcs("video_call")}</option>
                                <option value="EMAIL">{lcs("email")}</option>
                              </Field>
                              <input className={c.call} type="submit" value={lcs("save")}></input>
                            </form>
                          )}
                      </Formik>
                    </div>
                  </div>
                </div>

              </div>
              <div className={"col-md-5 panel"}>
                <div className={"row panel_header"}>
                  <div className={"col-md-12"}>
                    <div className={"d-flex w-100 justify-content-start"}>
                      <div className={" title"}> {lcs("key_insights")}</div>
                    </div>
                  </div>
                </div>
                <div className={"row panel_list"}>
                  <div className={"col-md-11"}>
                    <Insights
                      interviewId={interview.id}
                      projectId={interview.project_id} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentDidMount()
  {
    const onSave = res =>
      this.setState({ interview: res.body });
    if (this.props.interviewId == null) {
      let interview = {
        channel: "FACE_TO_FACE",
        interviewee_type: "CUSTOMER",
        project_id: this.props.projectId ? this.props.projectId : this.props.match.params.project_id,
        creator_id: sessionStorage.getItem('id')
      }
      this.props.saveInterview(interview, onSave);
    }
    else this.loadData();
  }

  loadData = () =>
  {
    const { getInterviewDetails, interviewId } = this.props;
    const callback = res =>
      this.setState({ interview: res.body });
    getInterviewDetails(interviewId, callback);
  }


  /* Events */

  onSubmit(values, { setSubmitting })
  {
    let interview = this.state.interview ? this.state.interview : {};
    interview.transcript = values.transcript;
    interview.interviewee_name = values.interviewee_name;
    interview.interviewee_rol = values.interviewee_rol;
    interview.interviewee_company = values.interviewee_company;
    interview.interviewee_contact = values.interviewee_contact;
    interview.interviewee_type = values.interviewee_type;
    interview.channel = values.channel;
    this.saveData(interview);
  }

  onValidate() { }

  /* Actions */


  saveData(interview)
  {
    const onSave = res => 
    {
      if (res.ok) this.onSave(res.body);
      else this.onError(res.body)
    };
    this.props.setInterview(interview.id, interview, onSave)
  }

  onSave(res)
  {
    this.props.onClose();
  }

  onError(error)
  {
    this.setState({
      error: 'An error has occurred, try again'
    });
  }
}

export default redux(Form);
