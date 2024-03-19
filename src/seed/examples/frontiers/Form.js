import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/frontiers/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

function FrontierForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { frontier_id }  = props.match.params;
  const editMode = frontier_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_FRONTIER, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_FRONTIER, saveOptions);

  const qFrontier = useDetail(queries.FRONTIER, frontier_id);
  const qLocales = useQuery(LOCALES);

  if (editMode && qFrontier.loading) return <Loading />;
  if (editMode && qFrontier.error) return "Error";

  const onSubmit = (values) => {
    values.id = frontier_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { frontier = {} } = qFrontier.data;
  const { locales = [] } = qLocales.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Frontier</div>
      <div className={styles.form}>
        <Formik
           initialValues={frontier}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <div>
          <label className={styles.lbl}>L name</label>
          <Field component="select" name="lName.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <label className={styles.lbl}>Category</label>
          <Field component="select" name="category.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
          </Field>
          <br/>
          
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

export default FrontierForm;