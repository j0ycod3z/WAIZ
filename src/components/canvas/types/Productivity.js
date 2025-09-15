import * as React from 'react';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap'
import { lc } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'

class Productivity extends Base {
  render() {
    const { type, hypothesis, match } = this.props;
    const footerLegend = type.l_legend;
    const areas = type.areas;

    const footer = footerLegend ?
      <Row className={c.footer}>
        <Col>
          {lc(footerLegend)}
        </Col>
      </Row> : null

    return (
      <div className={c.module}>

        <Container className={cx(c.container, c.fullwidth)}>
          <Row className={c.fullwidth} data-height={100}>

            <Col md className={c.innercol}>

              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("MAKE_BUY", areas)}
                      hypothesis={this.getHypothesis("MAKE_BUY", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("SELL", areas)}
                      hypothesis={this.getHypothesis("SELL", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("RECORD", areas)}
                      hypothesis={this.getHypothesis("RECORD", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("QTR", areas)}
                      hypothesis={this.getHypothesis("QTR", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("THEME", areas)}
                      hypothesis={this.getHypothesis("THEME", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ACCOUNTABILITY", areas)}
                      hypothesis={this.getHypothesis("ACCOUNTABILITY", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ROCKS", areas)}
                      hypothesis={this.getHypothesis("ROCKS", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("SCOREBOARD", areas)}
                      hypothesis={this.getHypothesis("SCOREBOARD", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("PRIORITIES", areas)}
                      hypothesis={this.getHypothesis("PRIORITIES", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CRITICAL_PEOPLE_P1", areas)}
                      hypothesis={this.getHypothesis("CRITICAL_PEOPLE_P1", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CELEBRATION", areas)}
                      hypothesis={this.getHypothesis("CELEBRATION", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CRITICAL_PEOPLE_P2", areas)}
                      hypothesis={this.getHypothesis("CRITICAL_PEOPLE_P2", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CRITICAL_PROCESS_P1", areas)}
                      hypothesis={this.getHypothesis("CRITICAL_PROCESS_P1", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("REWARD", areas)}
                      hypothesis={this.getHypothesis("REWARD", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("CRITICAL_PROCESS_P2", areas)}
                      hypothesis={this.getHypothesis("CRITICAL_PROCESS_P2", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("TRENDS_P", areas)}
                      hypothesis={this.getHypothesis("TRENDS_P", areas, hypothesis)}
                      maxHypothesis={6}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

            </Col>
          </Row>
          {footer}
        </Container>

      </div>
    );
  }
}

export default Productivity;