import * as React from 'react';
import cx from 'classnames';
import redux from 'seed/redux';
import { lcs } from 'components/util/Locales'

import Hypothesis from 'components/canvas/Hypothesis'

import c from 'resources/css/canvas/Area.module.css'


class AreaTemp extends React.Component
{
  render()
  {
    const { hypothesis = [] } = this.props;
    let projectId = localStorage.getItem('projectId');
    const project = this.props.projects.filter(p => p.id == projectId)[0];

    if (project == null) return <div></div>

    const hypothesisS = hypothesis.sort((h1, h2) => h2.id - h1.id);
    const hypothesisList = hypothesisS.map(h =>
      h.is_active ?
        <div className={c.wrapperOther}>
          <div className={cx(c.item)}>
            <Hypothesis
              area={{}}
              project={project}
              hypothesis={h}
              selectedColor={this.props.selectedColor}
              setSelectedColor={this.props.setSelectedColor}
              match={this.props.match} />
          </div>
        </div> : null
    );

    return (
      <div className={c.module}>

        <div className={c.title}>
          {lcs("other_areas")}
        </div>
        <div className={cx(c.container, c.other)}>
          {hypothesisList}
        </div>
      </div>
    );
  }

}

export default redux(AreaTemp);