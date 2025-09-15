import React from 'react';
import { lcs } from "components/util/Locales"
import cx from 'classnames'

import Item from 'components/interviews/insights/Item'
import c from 'resources/css/interviews/insights/List.module.css'

function List(props) {
  const { insightsD = [], onDelete } = props;

  const insights = insightsD.map((i, index) => (
    <div className={c.itemContainer} key={index}>
      <Item insight={i} onDelete={(e) => onDelete(e)} />
    </div>
  ));

  const empty = (
    <div className={cx(c.empty)}>
      {lcs("insights_interview")}
    </div>
  );

  return (
    <div className={cx(c.module)}>
      {insightsD.length > 0 ? insights : empty}
    </div>
  );
}

export default List;