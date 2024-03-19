import React from "react";
import cx from "classnames";
import { Route } from "react-router-dom";
import CommentDetails from "seed/examples/comments/Details";
import CommentList from "seed/examples/comments/List";
import CommentListOptions from "seed/examples/comments/options/ListOptions";
import CommentDetailsOptions from "seed/examples/comments/options/DetailsOptions";
import CommentForm from "seed/examples/comments/Form";
import Modal from "seed/components/helpers/Modal";
import styles from "resources/css/seed/examples/comments/Comments.module.css";

function Comments(props) {

  const { path, url } = props.match;

  const List = (props) =>
    <div className={styles.list}>
      <div className={styles.options}>
        <CommentListOptions {...props}/>
      </div>
      <div className={styles.content}>
        <CommentList {...props} />
      </div>
    </div>;

  const Details = (props) =>
    <div className={styles.details}>
      <div className={styles.card}>
        <div className={styles.options}>
          <CommentDetailsOptions {...props} />
        </div>
        <div className={styles.content}>
          <CommentDetails {...props} />
        </div>
      </div>
    </div>;

  const Form = (props) =>
    <Modal {...props}>
      <CommentForm {...props} />
    </Modal>;

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <Route
          path={`${path}`}
          component={List} />
        <Route
          path={`${path}/:comment_id(\\d+)`}
          component={Details} />
      </div>
      <Route
        path={
          [`${path}/:any/new`,`${path}/new`,
          `${path}/:comment_id(\\d+)/edit`] }
        component={Form} />
    </div>
  );
}

export default Comments;