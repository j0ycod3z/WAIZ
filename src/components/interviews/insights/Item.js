import React from 'react';
import $ from 'jquery'
import cx from 'classnames';
import { lcs } from "components/util/Locales"
import c from 'resources/css/interviews/insights/Item.module.css'

function Item(props) {
  const { insight, onDelete } = props;

  const showOptions = (e) => $(e.currentTarget).find(`.${c.options}`).fadeIn();
  const hideOptions = (e) => $(e.currentTarget).find(`.${c.options}`).fadeOut();

  return (
    <div
      className={c.module}
      onMouseEnter={showOptions}
      onMouseLeave={hideOptions}
    >
      <div className={c.text}>
        {insight.text}
      </div>
      <div className={c.options}>
        <div
          className={cx(c.delete, c.option, 'fas fa-trash')}
          title={insight.id}
          onClick={(e) => onDelete(e)}
        />
      </div>
      <div className={c.footer}>
        <div className={c.type}>{lcs(insight.type.toLowerCase())}</div>
      </div>
    </div>
  );
};

export default Item;