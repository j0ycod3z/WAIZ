import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/area_helps/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

const AREAS  = `
{
  areas { }
}
`;

function AreaHelpForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { area_help_id }  = props.match.params;
  const editMode = area_help_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_AREA_HELP, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_AREA_HELP, saveOptions);

  const qAreaHelp = useDetail(queries.AREA_HELP, area_help_id);
  const qLocales = useQuery(LOCALES);
  const qAreas = useQuery(AREAS);

  if (editMode && qAreaHelp.loading) return <Loading />;
  if (editMode && qAreaHelp.error) return "Error";

  const onSubmit = (values) => {
    values.id = area_help_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { areaHelp = {} } = qAreaHelp.data;
  const { locales = [] } = qLocales.data;
  const { areas = [] } = qAreas.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Area help</div>
      <div className={styles.form}>
        <Formik
           initialValues={areaHelp}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <div>
          <label className={styles.lbl}>L content</label>
          <Field component="select" name="lContent.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>L video id</label>
          <Field component="select" name="lVideoId.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default AreaHelpForm;