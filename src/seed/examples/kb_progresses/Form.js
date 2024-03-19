import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_progresses/Form.module.css";

const USERS  = `
{
  users { }
}
`;

const KB_ITEMS  = `
{
  kbItems { }
}
`;

function KbProgressForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { kb_progress_id }  = props.match.params;
  const editMode = kb_progress_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_KB_PROGRESS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_KB_PROGRESS, saveOptions);

  const qKbProgress = useDetail(queries.KB_PROGRESS, kb_progress_id);
  const qUsers = useQuery(USERS);
  const qKbItems = useQuery(KB_ITEMS);

  if (editMode && qKbProgress.loading) return <Loading />;
  if (editMode && qKbProgress.error) return "Error";

  const onSubmit = (values) => {
    values.id = kb_progress_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { kbProgress = {} } = qKbProgress.data;
  const { users = [] } = qUsers.data;
  const { kbItems = [] } = qKbItems.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Kb progress</div>
      <div className={styles.form}>
        <Formik
           initialValues={kbProgress}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Value</label><br/>
          <Field type="text" name="value"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>User</label>
          <Field component="select" name="user.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { users.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Item</label>
          <Field component="select" name="item.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { kbItems.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default KbProgressForm;