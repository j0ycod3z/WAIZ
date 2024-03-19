import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_items/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

const KB_SECTIONS  = `
{
  kbSections { }
}
`;

function KbItemForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { kb_item_id }  = props.match.params;
  const editMode = kb_item_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_KB_ITEM, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_KB_ITEM, saveOptions);

  const qKbItem = useDetail(queries.KB_ITEM, kb_item_id);
  const qLocales = useQuery(LOCALES);
  const qKbSections = useQuery(KB_SECTIONS);

  if (editMode && qKbItem.loading) return <Loading />;
  if (editMode && qKbItem.error) return "Error";

  const onSubmit = (values) => {
    values.id = kb_item_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { kbItem = {} } = qKbItem.data;
  const { locales = [] } = qLocales.data;
  const { kbSections = [] } = qKbSections.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Kb item</div>
      <div className={styles.form}>
        <Formik
           initialValues={kbItem}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Index</label><br/>
          <Field type="number" name="index"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Video url</label><br/>
          <Field type="text" name="videoUrl"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Video id</label><br/>
          <Field type="text" name="videoId"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Source</label><br/>
          <Field type="text" name="source"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Section index</label><br/>
          <Field type="number" name="sectionIndex"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>L text</label>
          <Field component="select" name="lText.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>L title</label>
          <Field component="select" name="lTitle.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Section</label>
          <Field component="select" name="section.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { kbSections.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default KbItemForm;