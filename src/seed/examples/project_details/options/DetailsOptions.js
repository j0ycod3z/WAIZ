import React from "react";
import cx from "classnames";
import { useDelete } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Link } from "react-router-dom";
import styles from "resources/css/seed/examples/project_details/options/DetailsOptions.module.css";

function ProjectDetailDetailsOptions(props) {

    const { url } = props.match;
    const { project_detail_id } = props.match.params;

    const [callDelete, qDelete] = useDelete(queries.DELETE_PROJECT_DETAIL, {
      onCompleted: (data) => {
        const backUrl = url.substring(0, url.lastIndexOf("/"));
        props.history.push(backUrl);
      }
    });

    const onClickDelete = () =>
      callDelete({ id: project_detail_id });

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

export default ProjectDetailDetailsOptions;