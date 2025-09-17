import React from 'react';
import cx from 'classnames';

import c from 'components/canvas_forms/deepdives/Nav.module.scss'

function Nav(props) {
  const {
    numItems,
    activeItem
  } = props

  const onClickItem = (e) => {
    props.onChange(e.currentTarget.title);
  };

  const items = [];

  for (let i = 1; i <= numItems; i++){
    items.push(
      <div
        key={i}
        className={cx(c.item, {[c.active]: activeItem === i})}
        style={{
          left: `${(100 / (numItems - 1)) * (i - 1)}%`,
          marginTop: `${i > 1 ? -28 : -16}px`
        }}
        title={`Question ${i}`}
        onClick={onClickItem}
      >
        {i}
      </div>
    )
  }

  return (
    <div className={c.module}>
      <div className={c.line} />
      {items}
    </div>
  );
}

export default Nav;