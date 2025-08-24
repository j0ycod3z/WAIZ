import * as React from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'
import c2 from 'resources/css/canvas/types/Systemic.module.css'

class Systemic extends Base {
  render() {
    const { type, hypothesis, match } = this.props;
    const areas = type.areas;

    return (
      <div className={cx(c.module)}>
        <div className={cx(c2.parent)}>
          <div className={cx(c2.div1, c.content)}>
            <Area
              area={this.getArea("SOCIODEMOGRAPHIC", areas)}
              hypothesis={this.getHypothesis("SOCIODEMOGRAPHIC", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} 
            />
          </div>
          <div className={cx(c2.div2, c.content)}>
            <Area
              area={this.getArea("CHALLENGES", areas)}
              hypothesis={this.getHypothesis("CHALLENGES", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div3, c.content)}>
            <Area
              area={this.getArea("TECHNOLOGY", areas)}
              hypothesis={this.getHypothesis("TECHNOLOGY", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div4, c.content)}>
            <Area
              area={this.getArea("INDUSTRY", areas)}
              hypothesis={this.getHypothesis("INDUSTRY", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div5, c.content)}>
            <Area
              area={this.getArea("PROJECT", areas)}
              hypothesis={this.getHypothesis("PROJECT", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div6, c.content)}>
            <Area
              area={this.getArea("WEAKNESSES", areas)}
              hypothesis={this.getHypothesis("WEAKNESSES", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div7, c.content)}>
            <Area
              area={this.getArea("STRENGTHS", areas)}
              hypothesis={this.getHypothesis("STRENGTHS", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div8, c.content)}>
            <Area
              area={this.getArea("ECONOMIC", areas)}
              hypothesis={this.getHypothesis("ECONOMIC", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
          <div className={cx(c2.div9, c.content)}>
            <Area
              area={this.getArea("COMPETITION", areas)}
              hypothesis={this.getHypothesis("COMPETITION", areas, hypothesis)}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match}
            />
          </div>
        </div>
        <div className={c.brand}>{lcs("made_in_canou")}</div>
      </div>
    );
    // return (
    //   <div className={c.module}>
    //     <Container className={cx(c.container, c.fullwidth)}>
    //       <div className={cx('row', c.fullwidth)} style={{height: '100%'}}>
    //         <div className={cx('col-md-3', c.innercol)}>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("SOCIODEMOGRAPHIC", areas)}
    //                   hypothesis={this.getHypothesis("SOCIODEMOGRAPHIC", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("CHALLENGES", areas)}
    //                   hypothesis={this.getHypothesis("CHALLENGES", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className={cx('col-md-6', c.innercol)}>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("TECHNOLOGY", areas)}
    //                   hypothesis={this.getHypothesis("TECHNOLOGY", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("INDUSTRY", areas)}
    //                   hypothesis={this.getHypothesis("INDUSTRY", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("PROJECT", areas)}
    //                   hypothesis={this.getHypothesis("PROJECT", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("WEAKNESSES", areas)}
    //                   hypothesis={this.getHypothesis("WEAKNESSES", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("STRENGTHS", areas)}
    //                   hypothesis={this.getHypothesis("STRENGTHS", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className={cx('col-md-3', c.innercol)}>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("ECONOMIC", areas)}
    //                   hypothesis={this.getHypothesis("ECONOMIC", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //           <div className='row'>
    //             <div className={cx('col-md', c.col)}>
    //               <div className={c.content}>
    //                 <Area
    //                   area={this.getArea("COMPETITION", areas)}
    //                   hypothesis={this.getHypothesis("COMPETITION", areas, hypothesis)}
    //                   selectedColor={this.state.selectedColor}
    //                   setSelectedColor={this.setSelectedColor}
    //                   match={match} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* <Row className={c.fullwidth} data-height={100}>
    //       </Row> */}
    //       <div className={c.brand}>{lcs("made_in_canou")}</div>
    //     </Container>
    //   </div>
    // );
  }
}

export default Systemic;