import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/hypotheses/Form.module.css";

const AREAS  = `
{
  areas { }
}
`;

const CANVASES  = `
{
  canvases { }
}
`;

const USERS  = `
{
  users { }
}
`;

const AREA_TAGS  = `
{
  areaTags { }
}
`;

const HYPOTHESES  = `
{
  hypotheses { }
}
`;

function HypothesisForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { hypothesis_id }  = props.match.params;
  const editMode = hypothesis_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_HYPOTHESIS, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_HYPOTHESIS, saveOptions);

  const qHypothesis = useDetail(queries.HYPOTHESIS, hypothesis_id);
  const qAreas = useQuery(AREAS);
  const qCanvases = useQuery(CANVASES);
  const qUsers = useQuery(USERS);
  const qAreaTags = useQuery(AREA_TAGS);
  const qHypotheses = useQuery(HYPOTHESES);

  if (editMode && qHypothesis.loading) return <Loading />;
  if (editMode && qHypothesis.error) return "Error";

  const onSubmit = (values) => {
    values.id = hypothesis_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { hypothesis = {} } = qHypothesis.data;
  const { areas = [] } = qAreas.data;
  const { canvases = [] } = qCanvases.data;
  const { users = [] } = qUsers.data;
  const { areaTags = [] } = qAreaTags.data;
  const { hypotheses = [] } = qHypotheses.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Hypothesis</div>
      <div className={styles.form}>
        <Formik
           initialValues={hypothesis}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Text</label><br/>
          <Field type="text" name="text"
            component="textarea" rows="3"
            className={styles.txa} />
          <br/>
          
          <label className={styles.lbl}>Is active</label>
          <Field type="checkbox" name="isActive"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Is valid</label>
          <Field type="checkbox" name="isValid"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Is tested</label>
          <Field type="checkbox" name="isTested"
            className={styles.chk} />
          <br/>
          
          <label className={styles.lbl}>Color</label><br/>
          <Field type="text" name="color"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>V4 ref</label><br/>
          <Field type="number" name="v4Ref"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Area</label>
          <Field component="select" name="area.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { areas.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Blank area</label>
          <Field component="select" name="blankArea.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { areas.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Canvas</label>
          <Field component="select" name="canvas.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { canvases.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Creator</label>
          <Field component="select" name="creator.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { users.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Tags</label>
          <div className={styles.mul}>
          <MultiField name="tags"
            values={ areaTags.map((e, idx) => { return {value: e, label: e.id}; }) }
            setFieldValue={f.setFieldValue} value={f.values.tags} />
          </div>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Customers</label>
          <div className={styles.mul}>
          <MultiField name="customers"
            values={ hypotheses.map((e, idx) => { return {value: e, label: e.id}; }) }
            setFieldValue={f.setFieldValue} value={f.values.customers} />
          </div>
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

export default HypothesisForm;