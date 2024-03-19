import * as React from 'react';

import c from 'resources/css/canvas_forms/deepdives/Nav.module.css'

class Nav extends React.Component
{
  render()
  {
    const { numItems, activeItem } = this.props;
    let items = [];
    for (let i = 1; i <= numItems; i++)
      items.push(
        <div className={c.item + (activeItem == i ? " " + c.active : "")}
          style={{ left: (100 / (numItems - 1)) * (i - 1) + "%", marginTop: (i > 1 ? -28 : -16) + "px" }}
          title={i}
          onClick={this.onClickItem}>
          {i}
        </div>
      )
    return (
      <div className={c.module}>
        <div className={c.line}></div>
        {items}
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onClickItem = this.onClickItem.bind(this);
  }

  onClickItem = e =>
  {
    this.props.onChange(e.currentTarget.title)
  }
}

export default Nav;