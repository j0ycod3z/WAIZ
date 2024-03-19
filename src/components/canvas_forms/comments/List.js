import * as React from 'react'
import { lcs } from "components/util/Locales"
import Item from 'components/canvas_forms/comments/Item'
import c from 'resources/css/canvas_forms/comments/List.module.css'

class List extends React.Component
{
  render()
  {
    const { commentsD = [] } = this.props;
    const comments = commentsD.map(comment =>
      <div className={c.itemContainer}>
        <Item
          comment={comment}
          onDelete={this.props.onDelete} />
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
}

export default List;