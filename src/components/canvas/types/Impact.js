import * as React from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import AreaTemp from 'components/canvas/AreaTemp'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'
import c2 from 'resources/css/canvas/types/Impact.module.css'

class Impact extends Base {
  render() {
    const { type, hypothesis, allHPhase2, match } = this.props;
    const areas = type.areas;

    return (
      <div className={c.module}>
        <div className={cx(c2.parent)}>
          <div className={cx(c2.div1, c.content)}>
            <Area
              area={this.getArea("PARTNERS", areas)}
              hypothesis={this.getHypothesis("PARTNERS", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div2, c.content)}>
            <Area
              area={this.getArea("EXPERTISE", areas)}
              hypothesis={this.getHypothesis("EXPERTISE", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div3, c.content)}>
            <Area
              area={this.getArea("ACTIVITIES_RESOURCES", areas)}
              hypothesis={this.getHypothesis("ACTIVITIES_RESOURCES", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div4, c.content)}>
            <Area
              area={this.getArea("VALUE_PROPOSITION", areas)}
              hypothesis={this.getHypothesis("VALUE_PROPOSITION", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div5, c.content)}>
            <Area
              area={this.getArea("IMPACT", areas)}
              hypothesis={this.getHypothesis("IMPACT", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div6, c.content)}>
            <Area
              area={this.getArea("RELATIONS_CHANNELS", areas)}
              hypothesis={this.getHypothesis("RELATIONS_CHANNELS", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div7, c.content)}>
            <Area
              area={this.getArea("CUSTOMERS", areas)}
              hypothesis={this.getHypothesis("CUSTOMERS", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div8, c.content)}>
            <Area
              area={this.getArea("COSTS", areas)}
              hypothesis={this.getHypothesis("COSTS", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div9, c.content)}>
            <Area
              area={this.getArea("REVENUE", areas)}
              hypothesis={this.getHypothesis("REVENUE", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
        </div>
        <div className={cx(c.content, c.other)}>
          <AreaTemp
            hypothesis={allHPhase2}
            selectedColor={this.state.selectedColor}
            setSelectedColor={this.setSelectedColor}
            match={match} />
        </div>
        <div className={c.brand}>{lcs("made_in_canou")}</div>

      </div>
    );
  }
}

export default Impact;