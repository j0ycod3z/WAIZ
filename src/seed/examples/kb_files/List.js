import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_files/List.module.css";

const KB_FILES  = `
{
  kbFiles {
    url
    lang
    kbItem { }
  }
}
`;

function KbFileList(props)
{
  const { url } = props.match;

  const qKbFiles = useQuery(KB_FILES);

  if (qKbFiles.loading) return <Loading />;
  if (qKbFiles.error) return "Error";

  const { kbFiles } = qKbFiles.data;

  const kbFileList = kbFiles.map(item =>
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
      { kbFileList }
    </div>
  );
}

export default KbFileList;