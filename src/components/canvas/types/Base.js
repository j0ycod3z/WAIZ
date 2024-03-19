import * as React from 'react';
import $ from 'jquery'

import c from 'resources/css/canvas/types/Base.module.css'


class Base extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      selectedColor: "",
      animation: ""
    }
  }

  setSelectedColor = color =>
    this.setState({ selectedColor: color })

  componentDidMount()
  {
    window.onresize = this.onresize;
    for (let i = 1; i <= 5; i++)
      window.setTimeout(this.resize, i * i * 150);
    this.setState({ animation: sessionStorage.getItem('lastProjectId') == null || sessionStorage.getItem('lastProjectId') != localStorage.getItem('projectId') ? "slideInUp" : "" })
    sessionStorage.setItem('lastProjectId', localStorage.getItem('projectId'))
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.hypothesis.length !== this.props.hypothesis.length) {
      for (let i = 1; i <= 5; i++)
        window.setTimeout(this.resize, i * i * 150);
    }
  }

  resize()
  {
    $("." + c.container).each(function ()
    {
      let height = $(this).parent().height() - 70;
      let children = $(this).children();
      for (let child of children) {
        let proportion = $(child).attr("data-height");
        let childHeight = height * (proportion / 100);
        $(child).css('min-height', childHeight + 'px');
      }
    });

    $("." + c.innercol).each(function ()
    {
      let height = $(this).height();
      let children = $(this).children();

      let childrenHeight = 0;
      for (let child of children)
        childrenHeight += $(child).height();
      if (childrenHeight == height) return;
      let childHeight = height / children.length;
      for (let child of children)
        $(child).css('min-height', childHeight + 'px');
    });

    $("." + c.footer).css('visibility', 'visible');
  }

  getArea(category, areas)
  {
    let area = areas.filter(a => a.category == category)[0];
    return area ? area : {};
  }

  getHypothesis(category, areas, hypotheses)
  {
    let area = this.getArea(category, areas);
    let hypothesis = hypotheses.filter(h => h.area_id == area.id);
    return hypothesis;
  }
}

export default Base;