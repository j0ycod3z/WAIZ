import * as React from 'react';

import c from 'resources/css/helpers/Multiselect.module.css'


class Multiselect extends React.Component
{
  render()
  {
    const { values = [] } = this.props;
    const { value = [] } = this.props;

    let selected = {}
    for (let d of value)
      selected[d] = true;

    let items = values.map(v =>
    {
      let isSelected = Boolean(selected[v.value]);
      return (
        <div className={c.item}>
          <input type="checkbox" title={v.value} checked={isSelected} onChange={this.onItemSelected}></input>
          {v.label}
        </div>);
    });

    return (
      <div className={c.module}>
        {items}
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  // Events

  onItemSelected = e =>
  {
    const singleChoice = this.props.singleChoice;
    const title = e.currentTarget.title;
    const tVal = !isNaN(title) ? parseInt(title) : title;
    
    let res = this.props.value;
    let pos = res.indexOf(tVal);
    if (pos == -1)
      res.unshift(tVal)
    else res.splice(pos, 1);

    if (!singleChoice)
      this.props.onChange(res);
    else this.props.onChange(res[0])
  }

}

export default Multiselect;