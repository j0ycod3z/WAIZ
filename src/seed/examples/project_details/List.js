import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/project_details/List.module.css";

const PROJECT_DETAILS  = `
{
  projectDetails {
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

function ProjectDetailList(props)
{
  const { url } = props.match;

  const qProjectDetails = useQuery(PROJECT_DETAILS);

  if (qProjectDetails.loading) return <Loading />;
  if (qProjectDetails.error) return "Error";

  const { projectDetails } = qProjectDetails.data;

  const projectDetailList = projectDetails.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { projectDetailList }
    </div>
  );
}

export default ProjectDetailList;