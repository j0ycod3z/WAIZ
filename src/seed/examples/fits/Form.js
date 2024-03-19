import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/fits/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

function FitForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { fit_id }  = props.match.params;
  const editMode = fit_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_FIT, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_FIT, saveOptions);

  const qFit = useDetail(queries.FIT, fit_id);
  const qLocales = useQuery(LOCALES);

  if (editMode && qFit.loading) return <Loading />;
  if (editMode && qFit.error) return "Error";

  const onSubmit = (values) => {
    values.id = fit_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { fit = {} } = qFit.data;
  const { locales = [] } = qLocales.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Fit</div>
      <div className={styles.form}>
        <Formik
           initialValues={fit}
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
            <option value="PROBLEM_SOLUTION">PROBLEM_SOLUTION</option>
            <option value="PRODUCT_MARKET">PRODUCT_MARKET</option>
            <option value="BUSINESS_MODEL">BUSINESS_MODEL</option>
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

export default FitForm;