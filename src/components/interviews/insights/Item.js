import React from 'react';
import cx from 'classnames';
import { lcs } from "components/util/Locales"
import c from 'components/interviews/insights/Item.module.scss'

function Item(props) {
  const { insight, onDelete } = props;

  const type = insight.type.toLowerCase();
  return (
    <div className={c.module}>
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
        <div className={cx(c.type, c[type])}>{lcs(type)}</div>
      </div>
    </div>
  );
};

export default Item;