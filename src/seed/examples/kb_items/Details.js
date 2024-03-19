import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_items/Details.module.css";

const KB_ITEM  = `
{
  kbItem {
    index
    videoUrl
    videoId
    source
    sectionIndex
    lText { }
    lTitle { }
    section { }
    files { }
  }
}
`;

function KbItemDetails(props) {

  const { kb_item_id }  = props.match.params;
  const qKbItem = useDetail(KB_ITEM, kb_item_id);

  if (qKbItem.loading) return <Loading />;
  if (qKbItem.error) return "Error";

  const { kbItem = {} } = qKbItem.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Index</label><br/>
      <label className={styles.txt}>{kbItem.index.toString()}</label>
      <br/>
      <label className={styles.lbl}>Video url</label><br/>
      <label className={styles.txt}>{kbItem.videoUrl.toString()}</label>
      <br/>
      <label className={styles.lbl}>Video id</label><br/>
      <label className={styles.txt}>{kbItem.videoId.toString()}</label>
      <br/>
      <label className={styles.lbl}>Source</label><br/>
      <label className={styles.txt}>{kbItem.source.toString()}</label>
      <br/>
      <label className={styles.lbl}>Section index</label><br/>
      <label className={styles.txt}>{kbItem.sectionIndex.toString()}</label>
      <br/>
    </div>
  );
}

export default KbItemDetails;