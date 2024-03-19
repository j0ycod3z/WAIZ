import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/area_tags/Details.module.css";

const AREA_TAG  = `
{
  areaTag {
    lName { }
  }
}
`;

function AreaTagDetails(props) {

  const { area_tag_id }  = props.match.params;
  const qAreaTag = useDetail(AREA_TAG, area_tag_id);

  if (qAreaTag.loading) return <Loading />;
  if (qAreaTag.error) return "Error";

  const { areaTag = {} } = qAreaTag.data;

  return (
    <div className={styles.module}>
    </div>
  );
}

export default AreaTagDetails;