import React from 'react';
import cx from 'classnames';
import { lcs, getDate } from "components/util/Locales"
import c from 'resources/css/canvas_forms/insights/Item.module.css'

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

  let selectedType = "";

  if(['NICE_TO_HAVE', 'MUST_HAVE', 'INVALIDATE_HYPOTHESIS'].includes(type)){
    selectedType = lcs(type.toLowerCase())
  }
  
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
        <div className={c.type}>{selectedType}</div>
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