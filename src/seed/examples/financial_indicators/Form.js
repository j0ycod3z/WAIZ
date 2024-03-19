import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/financial_indicators/Form.module.css";

const PROJECT_DETAILS  = `
{
  projectDetails { }
}
`;

function FinancialIndicatorForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { financial_indicator_id }  = props.match.params;
  const editMode = financial_indicator_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_FINANCIAL_INDICATOR, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_FINANCIAL_INDICATOR, saveOptions);

  const qFinancialIndicator = useDetail(queries.FINANCIAL_INDICATOR, financial_indicator_id);
  const qProjectDetails = useQuery(PROJECT_DETAILS);

  if (editMode && qFinancialIndicator.loading) return <Loading />;
  if (editMode && qFinancialIndicator.error) return "Error";

  const onSubmit = (values) => {
    values.id = financial_indicator_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { financialIndicator = {} } = qFinancialIndicator.data;
  const { projectDetails = [] } = qProjectDetails.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Financial indicator</div>
      <div className={styles.form}>
        <Formik
           initialValues={financialIndicator}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Date</label>
          <Field type="date" name="date"
            className={styles.dte} />
          <br/>
          
          <label className={styles.lbl}>Net income</label><br/>
          <Field type="number" name="netIncome"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Gross profile margins</label><br/>
          <Field type="number" name="grossProfileMargins"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Ebitda</label><br/>
          <Field type="number" name="ebitda"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Cogs</label><br/>
          <Field type="number" name="cogs"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Burn rate</label><br/>
          <Field type="number" name="burnRate"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Runway</label><br/>
          <Field type="number" name="runway"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Customers</label><br/>
          <Field type="number" name="customers"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>New customers</label><br/>
          <Field type="number" name="newCustomers"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Customer acquisition cost</label><br/>
          <Field type="number" name="customerAcquisitionCost"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Customer lifetime value</label><br/>
          <Field type="number" name="customerLifetimeValue"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Customer churn rate</label><br/>
          <Field type="number" name="customerChurnRate"
            className={styles.txt} />
          <br/>
          
          <div>
          <label className={styles.lbl}>Project detail</label>
          <Field component="select" name="projectDetail.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { projectDetails.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default FinancialIndicatorForm;