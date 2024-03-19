import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/area_helps/Details.module.css";

const AREA_HELP  = `
{
  areaHelp {
    lContent { }
    lVideoId { }
    area { }
  }
}
`;

function AreaHelpDetails(props) {

  const { area_help_id }  = props.match.params;
  const qAreaHelp = useDetail(AREA_HELP, area_help_id);

  if (qAreaHelp.loading) return <Loading />;
  if (qAreaHelp.error) return "Error";

  const { areaHelp = {} } = qAreaHelp.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default AreaHelpDetails;