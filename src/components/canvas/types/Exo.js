import * as React from 'react';
import cx from 'classnames';
import { lc } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'components/canvas/types/Base.module.scss'

class Exo extends Base {
  render() {
    const { type, hypothesis, match } = this.props;
    const footerLegend = type.l_legend;
    const areas = type.areas;

    return (
      <div className={c.module}>
        <div className={cx('container', c.container, c.fullwidth)}>
          <div className={cx('row', c.fullwidth)} data-height={20}>
            <div className={cx('col', c.col)}>
              <div className={c.content}>
                <Area
                  area={this.getArea("MTP", areas)}
                  hypothesis={this.getHypothesis("MTP", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </div>
          </div>
          <div className={cx('row', c.fullwidth)} data-height={80}>
            <div className={cx('col-md-2', c.col)}>
              <div className={c.content}>
                <Area
                  area={this.getArea("INFORMATION", areas)}
                  hypothesis={this.getHypothesis("INFORMATION", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </div>
            <div className={cx('col-md-4', c.innercol)}>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("STAFF_ON_DEMAND", areas)}
                      hypothesis={this.getHypothesis("STAFF_ON_DEMAND", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("COMMUNITY", areas)}
                      hypothesis={this.getHypothesis("COMMUNITY", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ALGORITHMS", areas)}
                      hypothesis={this.getHypothesis("ALGORITHMS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("LEVERAGED_ASSETS", areas)}
                      hypothesis={this.getHypothesis("LEVERAGED_ASSETS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ENGAGEMENT", areas)}
                      hypothesis={this.getHypothesis("ENGAGEMENT", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('col-md-4', c.innercol)}>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("INTERFACES", areas)}
                      hypothesis={this.getHypothesis("INTERFACES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("DASHBOARDS", areas)}
                      hypothesis={this.getHypothesis("DASHBOARDS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("EXPERIMENTATION", areas)}
                      hypothesis={this.getHypothesis("EXPERIMENTATION", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("AUTONOMY", areas)}
                      hypothesis={this.getHypothesis("AUTONOMY", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className={cx('col', c.col)}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("SOCIAL_TECH", areas)}
                      hypothesis={this.getHypothesis("SOCIAL_TECH", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('col-md-2', c.col)}>
              <div className={c.content}>
                <Area
                  area={this.getArea("IMPLEMENTATION", areas)}
                  hypothesis={this.getHypothesis("IMPLEMENTATION", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
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

export default Exo;