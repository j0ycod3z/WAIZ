import * as React from 'react';
import $ from 'jquery'
import cx from 'classnames';
import { lcs, getDate } from "components/util/Locales"
import c from 'resources/css/canvas_forms/insights/Item.module.css'

class Item extends React.Component
{
  render()
  {
    const { insight } = this.props;
    let type = "";
    if (insight.type == "NICE_TO_HAVE") type = lcs("nice_to_have");
    if (insight.type == "MUST_HAVE") type = lcs("must_have");
    if (insight.type == "INVALIDATE_HYPOTHESIS") type = lcs("invalidate_hypothesis");

    return (
      <div className={c.module}
        onMouseEnter={this.showOptions}
        onMouseLeave={this.hideOptions}>
        <div className={c.text}>{insight.text}</div>
        <div className={c.options}>
          <div className={cx(c.delete, c.option, "fas fa-trash")}
            title={insight.id}
            onClick={this.props.onDelete}></div>
        </div>
        <div className={c.footer}>
          <div className={c.type}>{type}</div>
          <div className={c.dateContainer}>
            <img className={c.image} src={insight.creator.image_url} />
            <div className={c.date}>{insight.creator.first_name} on {getDate(insight.created_at)}</div>
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