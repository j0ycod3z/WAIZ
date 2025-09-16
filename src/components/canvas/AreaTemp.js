import * as React from 'react';
import cx from 'classnames';
import redux from 'seed/redux';
import { lcs } from 'components/util/Locales'

import Hypothesis from 'components/canvas/Hypothesis'

import c from 'components/canvas/Area.module.scss'

function AreaTemp(props) {
  const { hypothesis = [], projects } = props;

  const projectId = parseInt(localStorage.getItem('projectId'));
  const project = projects.find((p) => p.id === projectId);

  if (project == null) return <></>

  const hypothesisS = hypothesis.sort((h1, h2) => h2.id - h1.id);
  const hypothesisList = hypothesisS.map((h) =>
    h.is_active &&
      <div className={c.wrapperOther}>
        <Hypothesis
          area={{}}
          project={project}
          hypothesis={h}
          selectedColor={props.selectedColor}
          setSelectedColor={props.setSelectedColor}
          match={props.match}
        />
      </div>
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

export default redux(AreaTemp);