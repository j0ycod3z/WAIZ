import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/kb_sections/Details.module.css";

const KB_SECTION  = `
{
  kbSection {
    index
    lName { }
    lDescription { }
    course { }
    items { }
  }
}
`;

function KbSectionDetails(props) {

  const { kb_section_id }  = props.match.params;
  const qKbSection = useDetail(KB_SECTION, kb_section_id);

  if (qKbSection.loading) return <Loading />;
  if (qKbSection.error) return "Error";

  const { kbSection = {} } = qKbSection.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Index</label><br/>
      <label className={styles.txt}>{kbSection.index.toString()}</label>
      <br/>
    </div>
  );
}

export default KbSectionDetails;