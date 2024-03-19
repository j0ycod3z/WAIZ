import * as React from 'react';
import redux from 'seed/redux';

import Nav from 'components/canvas_forms/deepdives/Nav'
import Item from 'components/canvas_forms/deepdives/Item'
import { Route } from 'react-router-dom'

import c from 'resources/css/canvas_forms/DeepDive.module.css'

class DeepDive extends React.Component
{
  render()
  {
    const { area_id } = this.props.match.params;
    const deepQuestions = this.props.deepQuestions.filter(d => d.area_id == area_id);

    const { activeItem = 1 } = this.state;
    let numItems = deepQuestions.length;
    return (
      <div className={c.module}>
        <div className={c.navContainer}>
          <Nav
            numItems={numItems}
            activeItem={activeItem}
            onChange={this.onNavChange} />
        </div>
        <div className={c.itemContainer}>
          <Item
            numItems={numItems}
            activeItem={activeItem}
            question={numItems > 0 ? deepQuestions[activeItem - 1] : {}}
            onNavChange={this.onNavChange} />
        </div>
      </div>
    );
  }

  constructor(props)
  {
    super(props);
    const { area_id } = props.match.params;
    this.state = {
      activeItem: localStorage.getItem('nextItemTemp_' + area_id) ? localStorage.getItem('nextItemTemp_' + area_id) : 1
    }
    this.onNavChange = this.onNavChange.bind(this);
  }

  componentDidMount()
  {
    const { area_id } = this.props.match.params;
    this.props.getDeepQuestionList({ area: area_id });
  }

  onNavChange = val =>
  {
    const { area_id } = this.props.match.params;
    localStorage.setItem('nextItemTemp_' + area_id, val)
    this.setState({
      activeItem: val
    });
  }
}

export default redux(DeepDive);