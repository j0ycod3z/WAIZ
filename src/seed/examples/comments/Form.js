import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/comments/Form.module.css";

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

function CommentForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { comment_id }  = props.match.params;
  const editMode = comment_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_COMMENT, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_COMMENT, saveOptions);

  const qComment = useDetail(queries.COMMENT, comment_id);
  const qHypotheses = useQuery(HYPOTHESES);
  const qAreas = useQuery(AREAS);
  const qProjects = useQuery(PROJECTS);
  const qUsers = useQuery(USERS);

  if (editMode && qComment.loading) return <Loading />;
  if (editMode && qComment.error) return "Error";

  const onSubmit = (values) => {
    values.id = comment_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { comment = {} } = qComment.data;
  const { hypotheses = [] } = qHypotheses.data;
  const { areas = [] } = qAreas.data;
  const { projects = [] } = qProjects.data;
  const { users = [] } = qUsers.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Comment</div>
      <div className={styles.form}>
        <Formik
           initialValues={comment}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Text</label><br/>
          <Field type="text" name="text"
            component="textarea" rows="3"
            className={styles.txa} />
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

export default CommentForm;