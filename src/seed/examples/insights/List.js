import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/insights/List.module.css";

const INSIGHTS  = `
{
  insights {
    text
    type
    v4Ref
    hypothesis { }
    area { }
    interview { }
    project { }
    creator { }
  }
}
`;

function InsightList(props)
{
  const { url } = props.match;

  const qInsights = useQuery(INSIGHTS);

  if (qInsights.loading) return <Loading />;
  if (qInsights.error) return "Error";

  const { insights } = qInsights.data;

  const insightList = insights.map(item =>
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
      { insightList }
    </div>
  );
}

export default InsightList;