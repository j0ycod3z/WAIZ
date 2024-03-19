import * as React from 'react';
import { lcs } from "components/util/Locales"
import Item from 'components/canvas_forms/insights/Item'
import c from 'resources/css/canvas_forms/insights/List.module.css'

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
        <i className="fas fa-lightbulb" /><br />
        {lcs("insights_empty")}
    </div>

    return (
      <div className={c.module}>
        {insightsD.length > 0 ? insights : empty}
      </div>
    );
  }
}

export default List;