import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/hypotheses/List.module.css";

const HYPOTHESES  = `
{
  hypotheses {
    text
    isActive
    isValid
    isTested
    color
    v4Ref
    area { }
    blankArea { }
    canvas { }
    creator { }
    tags { }
    customers { }
  }
}
`;

function HypothesisList(props)
{
  const { url } = props.match;

  const qHypotheses = useQuery(HYPOTHESES);

  if (qHypotheses.loading) return <Loading />;
  if (qHypotheses.error) return "Error";

  const { hypotheses } = qHypotheses.data;

  const hypothesisList = hypotheses.map(item =>
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
      { hypothesisList }
    </div>
  );
}

export default HypothesisList;