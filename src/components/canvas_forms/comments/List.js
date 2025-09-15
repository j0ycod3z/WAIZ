import React from 'react'
import { lcs } from "components/util/Locales"
import Item from 'components/canvas_forms/comments/Item'
import c from 'resources/css/canvas_forms/comments/List.module.css'

function List(props) {
  const {
    commentsD = []
  } = props;

  const comments = commentsD.map(comment =>
    <div key={comment.id} className={c.itemContainer}>
      <Item
        comment={comment}
        onDelete={props.onDelete}
      />
    </div>)

  const empty =
    <div className={c.empty}>
      <i className="fas fa-comment" /><br />
      {lcs("comments_empty")}
    </div>
  
  return (
    <div className={c.module}>
      {commentsD.length > 0 ? comments : empty}
    </div>
  );
}

export default List;