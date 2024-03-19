import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/insights/Form.module.css";

const HYPOTHESES  = `
{
  hypotheses { }
}
`;

const AREAS  = `
{
  areas { }
}
`;

const INTERVIEWS  = `
{
  interviews { }
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

function InsightForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { insight_id }  = props.match.params;
  const editMode = insight_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_INSIGHT, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_INSIGHT, saveOptions);

  const qInsight = useDetail(queries.INSIGHT, insight_id);
  const qHypotheses = useQuery(HYPOTHESES);
  const qAreas = useQuery(AREAS);
  const qInterviews = useQuery(INTERVIEWS);
  const qProjects = useQuery(PROJECTS);
  const qUsers = useQuery(USERS);

  if (editMode && qInsight.loading) return <Loading />;
  if (editMode && qInsight.error) return "Error";

  const onSubmit = (values) => {
    values.id = insight_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { insight = {} } = qInsight.data;
  const { hypotheses = [] } = qHypotheses.data;
  const { areas = [] } = qAreas.data;
  const { interviews = [] } = qInterviews.data;
  const { projects = [] } = qProjects.data;
  const { users = [] } = qUsers.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Insight</div>
      <div className={styles.form}>
        <Formik
           initialValues={insight}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Text</label><br/>
          <Field type="text" name="text"
            component="textarea" rows="3"
            className={styles.txa} />
          <br/>
          
          <label className={styles.lbl}>Type</label>
          <Field component="select" name="type.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="NICE_TO_HAVE">NICE_TO_HAVE</option>
            <option value="MUST_HAVE">MUST_HAVE</option>
            <option value="INVALIDATE_HYPOTHESIS">INVALIDATE_HYPOTHESIS</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>V4 ref</label><br/>
          <Field type="number" name="v4Ref"
            className={styles.txt} />
          <br/>
          
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
          <label className={styles.lbl}>Area</label>
          <Field component="select" name="area.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { areas.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Interview</label>
          <Field component="select" name="interview.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { interviews.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default InsightForm;