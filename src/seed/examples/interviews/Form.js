import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/interviews/Form.module.css";

const AREA_TAGS  = `
{
  areaTags { }
}
`;

const HYPOTHESES  = `
{
  hypotheses { }
}
`;

const CANVASES  = `
{
  canvases { }
}
`;

const PROJECTS  = `
{
  projects { }
}
`;

const USERS  = `
{
  users { }
}
`;

function InterviewForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { interview_id }  = props.match.params;
  const editMode = interview_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_INTERVIEW, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_INTERVIEW, saveOptions);

  const qInterview = useDetail(queries.INTERVIEW, interview_id);
  const qAreaTags = useQuery(AREA_TAGS);
  const qHypotheses = useQuery(HYPOTHESES);
  const qCanvases = useQuery(CANVASES);
  const qProjects = useQuery(PROJECTS);
  const qUsers = useQuery(USERS);

  if (editMode && qInterview.loading) return <Loading />;
  if (editMode && qInterview.error) return "Error";

  const onSubmit = (values) => {
    values.id = interview_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { interview = {} } = qInterview.data;
  const { areaTags = [] } = qAreaTags.data;
  const { hypotheses = [] } = qHypotheses.data;
  const { canvases = [] } = qCanvases.data;
  const { projects = [] } = qProjects.data;
  const { users = [] } = qUsers.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Interview</div>
      <div className={styles.form}>
        <Formik
           initialValues={interview}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Transcript</label><br/>
          <Field type="text" name="transcript"
            component="textarea" rows="3"
            className={styles.txa} />
          <br/>
          
          <label className={styles.lbl}>Channel</label>
          <Field component="select" name="channel.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="FACE_TO_FACE">FACE_TO_FACE</option>
            <option value="TELEPHONE">TELEPHONE</option>
            <option value="VIDEO_CALL">VIDEO_CALL</option>
            <option value="EMAIL">EMAIL</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Interviewee type</label>
          <Field component="select" name="intervieweeType.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="EXPERT">EXPERT</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Interviewee name</label><br/>
          <Field type="text" name="intervieweeName"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Interviewee rol</label><br/>
          <Field type="text" name="intervieweeRol"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Interviewee company</label><br/>
          <Field type="text" name="intervieweeCompany"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Interviewee contact</label><br/>
          <Field type="text" name="intervieweeContact"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>V4 ref</label><br/>
          <Field type="number" name="v4Ref"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Interviewee tag</label>
          <Field component="select" name="intervieweeTag.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { areaTags.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Hypothesis</label>
          <Field component="select" name="hypothesis.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { hypotheses.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Canvas</label>
          <Field component="select" name="canvas.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { canvases.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Project</label>
          <Field component="select" name="project.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { projects.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Creator</label>
          <Field component="select" name="creator.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { users.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          {state.error ?
            <div className={styles.error}>{state.error}</div> : null}
          <button type="submit" className={styles.submit}>Send</button>
        </form>
        )}
        />
      </div>
    </div>
  );
}

export default InterviewForm;