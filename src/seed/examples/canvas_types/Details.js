import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/canvas_types/Details.module.css";

const CANVAS_TYPE  = `
{
  canvasType {
    type
    lName { }
    lLegend { }
    areas { }
  }
}
`;

function CanvasTypeDetails(props) {

  const { canvas_type_id }  = props.match.params;
  const qCanvasType = useDetail(CANVAS_TYPE, canvas_type_id);

  if (qCanvasType.loading) return <Loading />;
  if (qCanvasType.error) return "Error";

  const { canvasType = {} } = qCanvasType.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Type</label><br/>
      <label className={styles.txt}>{canvasType.type.toString()}</label>
      <br/>
    </div>
  );
}

export default CanvasTypeDetails;