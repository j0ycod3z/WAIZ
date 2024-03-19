import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/comments/List.module.css";

const COMMENTS  = `
{
  comments {
    text
    v4Ref
    hypothesis { }
    area { }
    project { }
    creator { }
  }
}
`;

function CommentList(props)
{
  const { url } = props.match;

  const qComments = useQuery(COMMENTS);

  if (qComments.loading) return <Loading />;
  if (qComments.error) return "Error";

  const { comments } = qComments.data;

  const commentList = comments.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { commentList }
    </div>
  );
}

export default CommentList;