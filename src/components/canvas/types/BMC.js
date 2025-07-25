import * as React from 'react';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap'
import { lc } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import AreaTemp from 'components/canvas/AreaTemp'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'

class BMC extends Base {
  render() {
    const { type, hypothesis, allHPhase2, match } = this.props;
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

        <Container className={cx(c.container, c.fullwidth, "animated fast", this.state.animation)}>
          <Row className={c.fullwidth} data-height={70}>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("PARTNERS", areas)}
                  hypothesis={this.getHypothesis("PARTNERS", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
            <Col className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ACTIVITIES", areas)}
                      hypothesis={this.getHypothesis("ACTIVITIES", areas, hypothesis)}
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
                      area={this.getArea("RESOURCES", areas)}
                      hypothesis={this.getHypothesis("RESOURCES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("VALUE_PROPOSITION", areas)}
                  hypothesis={this.getHypothesis("VALUE_PROPOSITION", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
            <Col className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("RELATIONSHIPS", areas)}
                      hypothesis={this.getHypothesis("RELATIONSHIPS", areas, hypothesis)}
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
                      area={this.getArea("CHANNELS", areas)}
                      hypothesis={this.getHypothesis("CHANNELS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("CUSTOMERS", areas)}
                  hypothesis={this.getHypothesis("CUSTOMERS", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
          </Row>
          <Row className={c.fullwidth} data-height={30}>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("COSTS", areas)}
                  hypothesis={this.getHypothesis("COSTS", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("REVENUE", areas)}
                  hypothesis={this.getHypothesis("REVENUE", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
          </Row>
          <div className={cx(c.content, c.other)}>
            <AreaTemp hypothesis={allHPhase2} selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
          {footer}
        </Container>

      </div>
    );
  }
}

export default BMC;