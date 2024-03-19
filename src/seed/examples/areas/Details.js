import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/areas/Details.module.css";

const AREA  = `
{
  area {
    category
    lName { }
    canvasType { }
    tags { }
  }
}
`;

function AreaDetails(props) {

  const { area_id }  = props.match.params;
  const qArea = useDetail(AREA, area_id);

  if (qArea.loading) return <Loading />;
  if (qArea.error) return "Error";

  const { area = {} } = qArea.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Category</label><br/>
      <label className={styles.txt}>{area.category.toString()}</label>
      <br/>
    </div>
  );
}

export default AreaDetails;