import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/canvases/Details.module.css";

const CANVAS  = `
{
  canvas {
    type { }
    project { }
  }
}
`;

function CanvasDetails(props) {

  const { canvas_id }  = props.match.params;
  const qCanvas = useDetail(CANVAS, canvas_id);

  if (qCanvas.loading) return <Loading />;
  if (qCanvas.error) return "Error";

  const { canvas = {} } = qCanvas.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default CanvasDetails;