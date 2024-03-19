import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/comments/Details.module.css";

const COMMENT  = `
{
  comment {
    text
    v4Ref
    hypothesis { }
    area { }
    project { }
    creator { }
  }
}
`;

function CommentDetails(props) {

  const { comment_id }  = props.match.params;
  const qComment = useDetail(COMMENT, comment_id);

  if (qComment.loading) return <Loading />;
  if (qComment.error) return "Error";

  const { comment = {} } = qComment.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Text</label><br/>
      <label className={styles.txt}>{comment.text.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{comment.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default CommentDetails;