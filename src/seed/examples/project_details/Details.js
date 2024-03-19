import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/project_details/Details.module.css";

const PROJECT_DETAIL  = `
{
  projectDetail {
    country
    state
    industry
    website
    totalSales
    raisedCapital
    investmentRequest
    numPatents
    numEmployees
    totalAvailableMarket
    servedAvailableMarket
    targetMarket
    incDate
    irl
    validatedByInstructor
    countryVisibility
    stateVisibility
    industryVisibility
    websiteVisibility
    totalSalesVisibility
    raisedCapitalVisibility
    investmentRequestVisibility
    numPatentsVisibility
    numEmployeesVisibility
    totalAvailableMarketVisibility
    servedAvailableMarketVisibility
    targetMarketVisibility
    incDateVisibility
    irlVisibility
    prototypeVisibility
    featuresVisibility
    financialVisibility
    highPrototype { }
    lowPrototype { }
    project { }
    features { }
  }
}
`;

function ProjectDetailDetails(props) {

  const { project_detail_id }  = props.match.params;
  const qProjectDetail = useDetail(PROJECT_DETAIL, project_detail_id);

  if (qProjectDetail.loading) return <Loading />;
  if (qProjectDetail.error) return "Error";

  const { projectDetail = {} } = qProjectDetail.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Country</label><br/>
      <label className={styles.txt}>{projectDetail.country.toString()}</label>
      <br/>
      <label className={styles.lbl}>State</label><br/>
      <label className={styles.txt}>{projectDetail.state.toString()}</label>
      <br/>
      <label className={styles.lbl}>Industry</label><br/>
      <label className={styles.txt}>{projectDetail.industry.toString()}</label>
      <br/>
      <label className={styles.lbl}>Website</label><br/>
      <label className={styles.txt}>{projectDetail.website.toString()}</label>
      <br/>
      <label className={styles.lbl}>Total sales</label><br/>
      <label className={styles.txt}>{projectDetail.totalSales.toString()}</label>
      <br/>
      <label className={styles.lbl}>Raised capital</label><br/>
      <label className={styles.txt}>{projectDetail.raisedCapital.toString()}</label>
      <br/>
      <label className={styles.lbl}>Investment request</label><br/>
      <label className={styles.txt}>{projectDetail.investmentRequest.toString()}</label>
      <br/>
      <label className={styles.lbl}>Num patents</label><br/>
      <label className={styles.txt}>{projectDetail.numPatents.toString()}</label>
      <br/>
      <label className={styles.lbl}>Num employees</label><br/>
      <label className={styles.txt}>{projectDetail.numEmployees.toString()}</label>
      <br/>
      <label className={styles.lbl}>Total available market</label><br/>
      <label className={styles.txt}>{projectDetail.totalAvailableMarket.toString()}</label>
      <br/>
      <label className={styles.lbl}>Served available market</label><br/>
      <label className={styles.txt}>{projectDetail.servedAvailableMarket.toString()}</label>
      <br/>
      <label className={styles.lbl}>Target market</label><br/>
      <label className={styles.txt}>{projectDetail.targetMarket.toString()}</label>
      <br/>
      <label className={styles.lbl}>Inc date</label><br/>
      <label className={styles.txt}>{projectDetail.incDate.toString()}</label>
      <br/>
      <label className={styles.lbl}>Irl</label><br/>
      <label className={styles.txt}>{projectDetail.irl.toString()}</label>
      <br/>
      <label className={styles.lbl}>High prototype</label><br/>
      <label className={styles.txt}>{projectDetail.highPrototype.toString()}</label>
      <br/>
      <label className={styles.lbl}>Low prototype</label><br/>
      <label className={styles.txt}>{projectDetail.lowPrototype.toString()}</label>
      <br/>
      <label className={styles.lbl}>Validated by instructor</label><br/>
      <label className={styles.txt}>{projectDetail.validatedByInstructor.toString()}</label>
      <br/>
      <label className={styles.lbl}>Country visibility</label><br/>
      <label className={styles.txt}>{projectDetail.countryVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>State visibility</label><br/>
      <label className={styles.txt}>{projectDetail.stateVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Industry visibility</label><br/>
      <label className={styles.txt}>{projectDetail.industryVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Website visibility</label><br/>
      <label className={styles.txt}>{projectDetail.websiteVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Total sales visibility</label><br/>
      <label className={styles.txt}>{projectDetail.totalSalesVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Raised capital visibility</label><br/>
      <label className={styles.txt}>{projectDetail.raisedCapitalVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Investment request visibility</label><br/>
      <label className={styles.txt}>{projectDetail.investmentRequestVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Num patents visibility</label><br/>
      <label className={styles.txt}>{projectDetail.numPatentsVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Num employees visibility</label><br/>
      <label className={styles.txt}>{projectDetail.numEmployeesVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Total available market visibility</label><br/>
      <label className={styles.txt}>{projectDetail.totalAvailableMarketVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Served available market visibility</label><br/>
      <label className={styles.txt}>{projectDetail.servedAvailableMarketVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Target market visibility</label><br/>
      <label className={styles.txt}>{projectDetail.targetMarketVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Inc date visibility</label><br/>
      <label className={styles.txt}>{projectDetail.incDateVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Irl visibility</label><br/>
      <label className={styles.txt}>{projectDetail.irlVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Prototype visibility</label><br/>
      <label className={styles.txt}>{projectDetail.prototypeVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Features visibility</label><br/>
      <label className={styles.txt}>{projectDetail.featuresVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Financial visibility</label><br/>
      <label className={styles.txt}>{projectDetail.financialVisibility.toString()}</label>
      <br/>
    </div>
  );
}

export default ProjectDetailDetails;