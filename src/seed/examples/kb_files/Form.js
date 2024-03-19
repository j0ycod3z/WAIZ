import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_files/Form.module.css";

const KB_ITEMS  = `
{
  kbItems { }
}
`;

function KbFileForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { kb_file_id }  = props.match.params;
  const editMode = kb_file_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_KB_FILE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_KB_FILE, saveOptions);

  const qKbFile = useDetail(queries.KB_FILE, kb_file_id);
  const qKbItems = useQuery(KB_ITEMS);

  if (editMode && qKbFile.loading) return <Loading />;
  if (editMode && qKbFile.error) return "Error";

  const onSubmit = (values) => {
    values.id = kb_file_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { kbFile = {} } = qKbFile.data;
  const { kbItems = [] } = qKbItems.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Kb file</div>
      <div className={styles.form}>
        <Formik
           initialValues={kbFile}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Url</label><br/>
          <Field type="text" name="url"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Lang</label>
          <Field component="select" name="lang.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="ZH">ZH</option>
          </Field>
          <br/>
          
          <div>
          <label className={styles.lbl}>Kb item</label>
          <Field component="select" name="kbItem.id"
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

export default KbFileForm;