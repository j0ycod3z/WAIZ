import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/users/Form.module.css";

function UserForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { user_id }  = props.match.params;
  const editMode = user_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_USER, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_USER, saveOptions);

  const qUser = useDetail(queries.USER, user_id);

  if (editMode && qUser.loading) return <Loading />;
  if (editMode && qUser.error) return "Error";

  const onSubmit = (values) => {
    values.id = user_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { user = {} } = qUser.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>User</div>
      <div className={styles.form}>
        <Formik
           initialValues={user}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Image url</label><br/>
          <Field type="text" name="imageUrl"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Color</label><br/>
          <Field type="text" name="color"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Lang</label>
          <Field component="select" name="lang.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="EN">EN</option>
            <option value="ES">ES</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Plan</label>
          <Field component="select" name="plan.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="TRIAL">TRIAL</option>
            <option value="PREMIUM">PREMIUM</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Verification token</label><br/>
          <Field type="text" name="verificationToken"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Is verified</label>
          <Field type="checkbox" name="isVerified"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Intro status</label><br/>
          <Field type="text" name="introStatus"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>V4 ref</label><br/>
          <Field type="number" name="v4Ref"
            className={styles.txt} />
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

export default UserForm;