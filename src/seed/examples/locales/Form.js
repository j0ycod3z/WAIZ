import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/locales/Form.module.css";

function LocaleForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { locale_id }  = props.match.params;
  const editMode = locale_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_LOCALE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_LOCALE, saveOptions);

  const qLocale = useDetail(queries.LOCALE, locale_id);

  if (editMode && qLocale.loading) return <Loading />;
  if (editMode && qLocale.error) return "Error";

  const onSubmit = (values) => {
    values.id = locale_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { locale = {} } = qLocale.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Locale</div>
      <div className={styles.form}>
        <Formik
           initialValues={locale}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Ref</label><br/>
          <Field type="text" name="ref"
            component="textarea" rows="3"
            className={styles.txa} />
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

export default LocaleForm;