import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_files/Details.module.css";

const KB_FILE  = `
{
  kbFile {
    url
    lang
    kbItem { }
  }
}
`;

function KbFileDetails(props) {

  const { kb_file_id }  = props.match.params;
  const qKbFile = useDetail(KB_FILE, kb_file_id);

  if (qKbFile.loading) return <Loading />;
  if (qKbFile.error) return "Error";

  const { kbFile = {} } = qKbFile.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Url</label><br/>
      <label className={styles.txt}>{kbFile.url.toString()}</label>
      <br/>
      <label className={styles.lbl}>Lang</label><br/>
      <label className={styles.txt}>{kbFile.lang.toString()}</label>
      <br/>
    </div>
  );
}

export default KbFileDetails;