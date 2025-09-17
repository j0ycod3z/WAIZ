import React from 'react';
import cx from 'classnames';
import { lcs, getDate } from "components/util/Locales"
import c from 'components/canvas_forms/insights/Item.module.scss'

function Item(props) {
  const {
    insight: {
      id,
      type,
      text,
      creator,
      created_at,
    },
  } = props;

  let selectedType = type.toLowerCase();

  return (
    <div className={c.module}>
      <div className={c.text}>{text}</div>
      <div className={c.options}>
        <div
          className={cx(c.delete, c.option, "fas fa-trash")}
          title={id}
          onClick={props.onDelete}
        />
      </div>
      <div className={c.footer}>
        <div className={cx(c.type, c[selectedType])}>{lcs(selectedType)}</div>
        <div className={c.dateContainer}>
          <img className={c.image} src={creator.image_url} alt="creator" />
          <div className={c.date}>
            {creator.first_name} on {getDate(created_at)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;