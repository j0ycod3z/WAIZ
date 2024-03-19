import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/areas/Form.module.css";

const LOCALES  = `
{
  locales { }
}
`;

const CANVAS_TYPES  = `
{
  canvasTypes { }
}
`;

const AREA_TAGS  = `
{
  areaTags { }
}
`;

function AreaForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { area_id }  = props.match.params;
  const editMode = area_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_AREA, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_AREA, saveOptions);

  const qArea = useDetail(queries.AREA, area_id);
  const qLocales = useQuery(LOCALES);
  const qCanvasTypes = useQuery(CANVAS_TYPES);
  const qAreaTags = useQuery(AREA_TAGS);

  if (editMode && qArea.loading) return <Loading />;
  if (editMode && qArea.error) return "Error";

  const onSubmit = (values) => {
    values.id = area_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { area = {} } = qArea.data;
  const { locales = [] } = qLocales.data;
  const { canvasTypes = [] } = qCanvasTypes.data;
  const { areaTags = [] } = qAreaTags.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Area</div>
      <div className={styles.form}>
        <Formik
           initialValues={area}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Category</label>
          <Field component="select" name="category.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="CUSTOMERS">CUSTOMERS</option>
            <option value="VALUE_PROPOSITION">VALUE_PROPOSITION</option>
            <option value="CHANNELS">CHANNELS</option>
            <option value="REVENUE">REVENUE</option>
            <option value="PARTNERS">PARTNERS</option>
            <option value="ACTIVITIES">ACTIVITIES</option>
            <option value="RESOURCES">RESOURCES</option>
            <option value="COSTS">COSTS</option>
            <option value="METRICS">METRICS</option>
            <option value="DIFFERENTIATION">DIFFERENTIATION</option>
            <option value="RELATIONS_CHANNELS">RELATIONS_CHANNELS</option>
            <option value="ACTIVITIES_RESOURCES">ACTIVITIES_RESOURCES</option>
            <option value="PRODUCTS">PRODUCTS</option>
            <option value="CHALLENGES_OPS">CHALLENGES_OPS</option>
            <option value="IMPACT">IMPACT</option>
            <option value="EXPERTISE">EXPERTISE</option>
            <option value="OBJECTIVES">OBJECTIVES</option>
            <option value="RELATIONSHIPS">RELATIONSHIPS</option>
            <option value="MTP">MTP</option>
            <option value="INFORMATION">INFORMATION</option>
            <option value="IMPLEMENTATION">IMPLEMENTATION</option>
            <option value="STAFF_ON_DEMAND">STAFF_ON_DEMAND</option>
            <option value="INTERFACES">INTERFACES</option>
            <option value="COMMUNITY">COMMUNITY</option>
            <option value="DASHBOARDS">DASHBOARDS</option>
            <option value="ALGORITHMS">ALGORITHMS</option>
            <option value="EXPERIMENTATION">EXPERIMENTATION</option>
            <option value="LEVERAGED_ASSETS">LEVERAGED_ASSETS</option>
            <option value="AUTONOMY">AUTONOMY</option>
            <option value="ENGAGEMENT">ENGAGEMENT</option>
            <option value="SOCIAL_TECH">SOCIAL_TECH</option>
            <option value="SOCIODEMOGRAPHIC">SOCIODEMOGRAPHIC</option>
            <option value="COMPETITION">COMPETITION</option>
            <option value="ECONOMIC">ECONOMIC</option>
            <option value="INDUSTRY">INDUSTRY</option>
            <option value="TECHNOLOGY">TECHNOLOGY</option>
            <option value="CHALLENGES">CHALLENGES</option>
            <option value="PROJECT">PROJECT</option>
            <option value="STRENGTHS">STRENGTHS</option>
            <option value="WEAKNESSES">WEAKNESSES</option>
            <option value="EMPLOYEES">EMPLOYEES</option>
            <option value="CUSTOMERS_R">CUSTOMERS_R</option>
            <option value="SHAREHOLDERS">SHAREHOLDERS</option>
            <option value="CORE_VALUES">CORE_VALUES</option>
            <option value="PURPOSE">PURPOSE</option>
            <option value="TARGET">TARGET</option>
            <option value="SANDBOX">SANDBOX</option>
            <option value="GOALS">GOALS</option>
            <option value="ACTIONS">ACTIONS</option>
            <option value="THRUSTS">THRUSTS</option>
            <option value="INITIATIVES">INITIATIVES</option>
            <option value="PROFILE_PER">PROFILE_PER</option>
            <option value="BRAND_KPI">BRAND_KPI</option>
            <option value="CRITICAL_PEOPLE">CRITICAL_PEOPLE</option>
            <option value="BHAG">BHAG</option>
            <option value="BRAND_PROMISES">BRAND_PROMISES</option>
            <option value="CRITICAL_PROMISES">CRITICAL_PROMISES</option>
            <option value="STRENGTHS_R">STRENGTHS_R</option>
            <option value="WEAKNESSES_R">WEAKNESSES_R</option>
            <option value="MAKE_BUY">MAKE_BUY</option>
            <option value="SELL">SELL</option>
            <option value="RECORD">RECORD</option>
            <option value="QTR">QTR</option>
            <option value="THEME">THEME</option>
            <option value="ACCOUNTABILITY">ACCOUNTABILITY</option>
            <option value="ROCKS">ROCKS</option>
            <option value="SCOREBOARD">SCOREBOARD</option>
            <option value="PRIORITIES">PRIORITIES</option>
            <option value="CRITICAL_PEOPLE_P1">CRITICAL_PEOPLE_P1</option>
            <option value="CELEBRATION">CELEBRATION</option>
            <option value="CRITICAL_PEOPLE_P2">CRITICAL_PEOPLE_P2</option>
            <option value="CRITICAL_PROCESS_P1">CRITICAL_PROCESS_P1</option>
            <option value="REWARD">REWARD</option>
            <option value="CRITICAL_PROCESS_P2">CRITICAL_PROCESS_P2</option>
            <option value="TRENDS_P">TRENDS_P</option>
            <option value="BLANK_1">BLANK_1</option>
            <option value="BLANK_2">BLANK_2</option>
            <option value="BLANK_3">BLANK_3</option>
            <option value="BLANK_4">BLANK_4</option>
            <option value="BLANK_5">BLANK_5</option>
            <option value="BLANK_6">BLANK_6</option>
            <option value="BLANK_7">BLANK_7</option>
            <option value="BLANK_8">BLANK_8</option>
            <option value="BLANK_9">BLANK_9</option>
            <option value="OTHER">OTHER</option>
          </Field>
          <br/>
          
          <div>
          <label className={styles.lbl}>L name</label>
          <Field component="select" name="lName.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { locales.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
          <div>
          <label className={styles.lbl}>Canvas type</label>
          <Field component="select" name="canvasType.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { canvasTypes.map((e, idx) => <option value={e.id}>{e.id}</option>) }
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

export default AreaForm;