import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/translations/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

function TranslationForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { translation_id }  = props.match.params;
  const editMode = translation_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_TRANSLATION, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_TRANSLATION, saveOptions);

  const qTranslation = useDetail(queries.TRANSLATION, translation_id);
  const qLocales = useQuery(LOCALES);

  if (editMode && qTranslation.loading) return <Loading />;
  if (editMode && qTranslation.error) return "Error";

  const onSubmit = (values) => {
    values.id = translation_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { translation = {} } = qTranslation.data;
  const { locales = [] } = qLocales.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Translation</div>
      <div className={styles.form}>
        <Formik
           initialValues={translation}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Value</label><br/>
          <Field type="text" name="value"
            component="textarea" rows="3"
            className={styles.txa} />
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
          <label className={styles.lbl}>Locale</label>
          <Field component="select" name="locale.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default TranslationForm;