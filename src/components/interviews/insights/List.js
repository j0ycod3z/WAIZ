import * as React from 'react';
import { lcs } from "components/util/Locales"
import Item from 'components/interviews/insights/Item'
import c from 'resources/css/interviews/insights/List.module.css'

class List extends React.Component
{
  render()
  {
    const { insightsD = [] } = this.props;
    const insights = insightsD.map(i =>
      <div className={c.itemContainer}>
        <Item insight={i}
          onDelete={this.props.onDelete} />
      </div>)

    const empty =
      <div className={c.empty}>
        {lcs("insights_interview")}
    </div>

    return (
      <div className={c.module}>
        {insightsD.length > 0 ? insights : empty}
      </div>
    );
  }
}

export default List;