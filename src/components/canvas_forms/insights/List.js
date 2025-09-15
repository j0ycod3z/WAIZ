import React from 'react';
import { lcs } from "components/util/Locales"
import Item from 'components/canvas_forms/insights/Item'
import c from 'resources/css/canvas_forms/insights/List.module.css'

function List(props) {
  const { insightsD = [] } = props;

  const insights = insightsD.map((i) =>
    <div key={i.id} className={c.itemContainer}>
      <Item insight={i} onDelete={props.onDelete} />
    </div>
  )

  const empty =
    <div className={c.empty}>
      <i className="fas fa-lightbulb" /><br />
      {lcs("insights_empty")}
    </div>

  return (
    <div className={c.module}>
      {insightsD.length > 0 ? insights : empty}
    </div>
  );
}

export default List;