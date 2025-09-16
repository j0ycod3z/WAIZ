import * as React from 'react';
import cx from 'classnames';

import Area from 'components/canvas/Area'
import AreaTemp from 'components/canvas/AreaTemp'
import Base from 'components/canvas/types/Base';

import c from 'components/canvas/types/Base.module.scss'
import c2 from 'components/canvas/types/Blank.module.scss'

class Blank extends Base {
  render() {
    const { type, hypothesis, allHPhase2, match } = this.props;
    const areas = type.areas;

    return (
      <div className={c.module}>
        <div className={cx(c2.parent)}>
          <div className={cx(c2.div1, c.content)}>
            <Area
              area={this.getArea("BLANK_1", areas)}
              hypothesis={this.getHypothesis("BLANK_1", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div2, c.content)}>
            <Area
              area={this.getArea("BLANK_2", areas)}
              hypothesis={this.getHypothesis("BLANK_2", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div3, c.content)}>
            <Area
              area={this.getArea("BLANK_3", areas)}
              hypothesis={this.getHypothesis("BLANK_3", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div4, c.content)}>
            <Area
              area={this.getArea("BLANK_4", areas)}
              hypothesis={this.getHypothesis("BLANK_4", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div5, c.content)}>
            <Area
              area={this.getArea("BLANK_5", areas)}
              hypothesis={this.getHypothesis("BLANK_5", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div6, c.content)}>
            <Area
              area={this.getArea("BLANK_6", areas)}
              hypothesis={this.getHypothesis("BLANK_6", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div7, c.content)}>
            <Area
              area={this.getArea("BLANK_7", areas)}
              hypothesis={this.getHypothesis("BLANK_7", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div8, c.content)}>
            <Area
              area={this.getArea("BLANK_8", areas)}
              hypothesis={this.getHypothesis("BLANK_8", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          <div className={cx(c2.div9, c.content)}>
            <Area
              area={this.getArea("BLANK_9", areas)}
              hypothesis={this.getHypothesis("BLANK_9", areas, hypothesis)}
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
      </div>
    );
  }
}

export default Blank;