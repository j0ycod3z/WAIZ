import React from "react";
import cx from "classnames";
import { useDelete } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Link } from "react-router-dom";
import styles from "resources/css/seed/examples/dev_stages/options/DetailsOptions.module.css";

function DevStageDetailsOptions(props) {

    const { url } = props.match;
    const { dev_stage_id } = props.match.params;

    const [callDelete, qDelete] = useDelete(queries.DELETE_DEV_STAGE, {
      onCompleted: (data) => {
        const backUrl = url.substring(0, url.lastIndexOf("/"));
        props.history.push(backUrl);
      }
    });

    const onClickDelete = () =>
      callDelete({ id: dev_stage_id });

    const onClickBack = () => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    };

    return (
      <div className={styles.module}>
        <i className={cx(styles.back, "fas fa-arrow-left")}
          onClick={onClickBack} />
        <div className={styles.options}>
          <Link to={`${url}/edit`}
            className={cx(styles.btn, styles.edit)}>Edit</Link>
          <button className={cx(styles.btn, styles.delete)}
            onClick={onClickDelete}>Delete</button>
        </div>
      </div>
    );
}

export default DevStageDetailsOptions;