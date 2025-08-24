import React, { useState, useEffect } from 'react';
import redux from 'seed/redux';

import cx from "classnames";
import { lcs } from 'components/util/Locales'
import { Formik, Field } from 'formik';
import Loading from 'seed/components/helpers/Loading'
import Insights from 'components/interviews/Insights'

import "react-bootstrap";

import c from 'resources/css/interviews/Form.module.css'

function Form(props) {
  const { 
    interviewId, 
    projectId, 
    match, 
    saveInterview, 
    getInterviewDetails, 
    setInterview, 
    onClose 
  } = props;

  const [interview, setInterviewState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onSave = (res) => setInterviewState(res.body);

    if (interviewId == null) {
      let newInterview = {
        channel: "FACE_TO_FACE",
        interviewee_type: "CUSTOMER",
        project_id: projectId ? projectId : match.params.project_id,
        creator_id: sessionStorage.getItem('id')
      };
      saveInterview(newInterview, onSave);
    } else {
      loadData();
    }
  }, [interviewId]);

  const loadData = () => {
    const callback = (res) => setInterviewState(res.body);
    getInterviewDetails(interviewId, callback);
  };

  const onSubmit = (values, { setSubmitting }) => {
    let updatedInterview = interview ? { ...interview } : {};
    updatedInterview.transcript = values.transcript;
    updatedInterview.interviewee_name = values.interviewee_name;
    updatedInterview.interviewee_rol = values.interviewee_rol;
    updatedInterview.interviewee_company = values.interviewee_company;
    updatedInterview.interviewee_contact = values.interviewee_contact;
    updatedInterview.interviewee_type = values.interviewee_type;
    updatedInterview.channel = values.channel;
    saveData(updatedInterview);
  };

  const onValidate = () => {};

  const saveData = (interviewObj) => {
    const onSave = (res) => {
      if (res.ok) handleSave(res.body);
      else handleError(res.body);
    };
    setInterview(interviewObj.id, interviewObj, onSave);
  };

  const handleSave = () => {
    onClose();
  };

  const handleError = () => {
    setError('An error has occurred, try again');
  };

  if (interview == null) return <Loading />;

    return (
      <div className={"module"}>
        <div className={cx("container", c.containerWhite)}>
          <div className={"row"}>
            <div className={cx("col-md-12", c.header)}>
              {lcs("interview")}
            </div>
          </div>
          <div className={"row"}>
            <div className={cx("col-md-7", c.panelText)}>
              <Formik
                initialValues={interview}
                validate={onValidate}
                onSubmit={onSubmit}>
                {({ values, errors, setFieldValue, handleSubmit }) => (
                    <form className={c.form} onSubmit={handleSubmit}>
                      <div className={c.label}>{lcs("transcript")}</div>
                      <Field name="transcript" component="textarea" className={c.transcript} />
                      
                      <div className={c.label}>{lcs("interviewee_information")}</div>
                      
                      <Field name="interviewee_name" type="text" placeholder={lcs("name")} required/>
                      <Field name="interviewee_rol" type="text" placeholder={lcs("job")} />
                      <Field name="interviewee_company" type="text" placeholder={lcs("company")} />
                      <Field name="interviewee_contact" type="text" placeholder={lcs("contact")} />
                      <Field name="interviewee_type" component="select" defaultValue={'DEFAULT'} required>
                        <option value="DEFAULT" disabled>{lcs("interviewee_type")}</option>
                        <option value="CUSTOMER">{lcs("customer")}</option>
                        <option value="EXPERT">{lcs("expert")}</option>
                      </Field>
                      <Field name="channel" component="select" defaultValue={'DEFAULT'} required>
                        <option value="DEFAULT" disabled>{lcs("interview_method")}</option>
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
            <div className={"col-md-5"}>
              <div className={cx("row", c.panelHeader)}>
                <div>{lcs("key_insights")}</div>
              </div>
              <div className={"row"}>
                <div className={"col-md-12"}>
                  <Insights
                    interviewId={interview.id}
                    projectId={interview.project_id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default redux(Form);