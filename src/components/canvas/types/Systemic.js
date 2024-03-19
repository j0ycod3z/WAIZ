import * as React from 'react';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap'
import { lcs } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'


class Systemic extends Base
{
  render()
  {
    const { type, hypothesis, match } = this.props;
    const areas = type.areas;

    return (
      <div className={c.module}>

        <Container className={cx(c.container, c.fullwidth, "animated fast", this.state.animation)}>
          <Row className={c.fullwidth} data-height={100}>

            <Col md={3} className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("SOCIODEMOGRAPHIC", areas)}
                      hypothesis={this.getHypothesis("SOCIODEMOGRAPHIC", areas, hypothesis)}
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
                      area={this.getArea("CHALLENGES", areas)}
                      hypothesis={this.getHypothesis("CHALLENGES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>

            <Col md={6} className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("TECHNOLOGY", areas)}
                      hypothesis={this.getHypothesis("TECHNOLOGY", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("INDUSTRY", areas)}
                      hypothesis={this.getHypothesis("INDUSTRY", areas, hypothesis)}
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
                      area={this.getArea("PROJECT", areas)}
                      hypothesis={this.getHypothesis("PROJECT", areas, hypothesis)}
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
                      area={this.getArea("WEAKNESSES", areas)}
                      hypothesis={this.getHypothesis("WEAKNESSES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("STRENGTHS", areas)}
                      hypothesis={this.getHypothesis("STRENGTHS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>


            <Col md={3} className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("ECONOMIC", areas)}
                      hypothesis={this.getHypothesis("ECONOMIC", areas, hypothesis)}
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
                      area={this.getArea("COMPETITION", areas)}
                      hypothesis={this.getHypothesis("COMPETITION", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className={c.brand}>{lcs("made_in_canou")}</div>
        </Container>

      </div>
    );
  }
}

export default Systemic;