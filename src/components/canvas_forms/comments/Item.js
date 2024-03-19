import * as React from 'react';
import $ from 'jquery'
import cx from 'classnames';
import { getDate } from "components/util/Locales"

import c from 'resources/css/canvas_forms/comments/Item.module.css'

class Item extends React.Component
{
  render()
  {
    const { comment } = this.props;
    return (
      <div className={c.module}
        onMouseEnter={this.showOptions}
        onMouseLeave={this.hideOptions}>
        <div className={c.text}>{comment.text}</div>
        <div className={c.options}>
          <div className={cx(c.delete, c.option, "fas fa-trash")}
            title={comment.id}
            onClick={this.props.onDelete}></div>
        </div>
        <div className={c.footer}>
          <div className={c.dateContainer}>
            <img className={c.image} src={comment.creator.image_url} />
            <div className={c.date}>{comment.creator.first_name} on {getDate(comment.created_at)}</div>
          </div>
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
  }

  showOptions = e =>
    $(e.currentTarget)
      .find("." + c.options).fadeIn();

  hideOptions = e =>
  {
    $(e.currentTarget)
      .find("." + c.options).fadeOut();
  }
}

export default Item;