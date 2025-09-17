import * as React from 'react';
import cx from 'classnames';
import { lc } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'components/canvas/types/Base.module.scss'

class Reputation extends Base {
  render() {
    const { type, hypothesis, match } = this.props;
    const footerLegend = type.l_legend;
    const areas = type.areas;

    return (
      <div className={c.module}>
        <div className={cx('container', c.container, c.fullwidth)}>
          <div className={cx('row', c.fullwidth)} data-height={100}>
            <div className={cx('col-md', c.innercol)}>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("EMPLOYEES", areas)}
                      hypothesis={this.getHypothesis("EMPLOYEES", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CUSTOMERS_R", areas)}
                      hypothesis={this.getHypothesis("CUSTOMERS_R", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("SHAREHOLDERS", areas)}
                      hypothesis={this.getHypothesis("SHAREHOLDERS", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CORE_VALUES", areas)}
                      hypothesis={this.getHypothesis("CORE_VALUES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("PURPOSE", areas)}
                      hypothesis={this.getHypothesis("PURPOSE", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={cx('row', c.innerrow)}>
                    <div className={cx('col-md', c.col)}>
                      <div className={c.content}>
                        <Area
                          area={this.getArea("TARGET", areas)}
                          hypothesis={this.getHypothesis("TARGET", areas, hypothesis)}
                          selectedColor={this.state.selectedColor}
                          setSelectedColor={this.setSelectedColor}
                          match={match}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx('row', c.innerrow)}>
                    <div className={cx('col-md', c.col)}>
                      <div className={c.content}>
                        <Area
                          area={this.getArea("SANDBOX", areas)}
                          hypothesis={this.getHypothesis("SANDBOX", areas, hypothesis)}
                          selectedColor={this.state.selectedColor}
                          setSelectedColor={this.setSelectedColor}
                          match={match}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("GOALS", areas)}
                      hypothesis={this.getHypothesis("GOALS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ACTIONS", areas)}
                      hypothesis={this.getHypothesis("ACTIONS", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("THRUSTS", areas)}
                      hypothesis={this.getHypothesis("THRUSTS", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("INITIATIVES", areas)}
                      hypothesis={this.getHypothesis("INITIATIVES", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("PROFILE_PER", areas)}
                      hypothesis={this.getHypothesis("PROFILE_PER", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("BRAND_KPI", areas)}
                      hypothesis={this.getHypothesis("BRAND_KPI", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CRITICAL_PEOPLE", areas)}
                      hypothesis={this.getHypothesis("CRITICAL_PEOPLE", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("BHAG", areas)}
                      hypothesis={this.getHypothesis("BHAG", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("BRAND_PROMISES", areas)}
                      hypothesis={this.getHypothesis("BRAND_PROMISES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CRITICAL_PROMISES", areas)}
                      hypothesis={this.getHypothesis("CRITICAL_PROMISES", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("STRENGTHS_R", areas)}
                      hypothesis={this.getHypothesis("STRENGTHS_R", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
                <div className={cx('col-md', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("WEAKNESSES_R", areas)}
                      hypothesis={this.getHypothesis("WEAKNESSES_R", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {footerLegend &&
            <div className={cx("row", c.footer)}>
              <div className="col">
                {lc(footerLegend)}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Reputation;