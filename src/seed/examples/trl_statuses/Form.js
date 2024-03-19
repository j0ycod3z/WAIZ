import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/trl_statuses/Form.module.css";

const PROJECTS  = `
{
  projects { }
}
`;

const TRL_QUESTIONS  = `
{
  trlQuestions { }
}
`;

function TrlStatusForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { trl_status_id }  = props.match.params;
  const editMode = trl_status_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_TRL_STATUS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_TRL_STATUS, saveOptions);

  const qTrlStatus = useDetail(queries.TRL_STATUS, trl_status_id);
  const qProjects = useQuery(PROJECTS);
  const qTrlQuestions = useQuery(TRL_QUESTIONS);

  if (editMode && qTrlStatus.loading) return <Loading />;
  if (editMode && qTrlStatus.error) return "Error";

  const onSubmit = (values) => {
    values.id = trl_status_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { trlStatus = {} } = qTrlStatus.data;
  const { projects = [] } = qProjects.data;
  const { trlQuestions = [] } = qTrlQuestions.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Trl status</div>
      <div className={styles.form}>
        <Formik
           initialValues={trlStatus}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Value</label>
          <Field type="checkbox" name="value"
            className={styles.chk} />
          <br/>
          
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
          <label className={styles.lbl}>Question</label>
          <Field component="select" name="question.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { trlQuestions.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default TrlStatusForm;