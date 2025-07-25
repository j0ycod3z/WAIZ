import * as React from 'react';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap'

import Area from 'components/canvas/Area'
import AreaTemp from 'components/canvas/AreaTemp'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'

class Blank extends Base {
  render() {
    const { type, hypothesis, allHPhase2, match } = this.props;
    const areas = type.areas;

    return (
      <div className={c.module}>

        <Container className={cx(c.container, c.fullwidth, "animated fast", this.state.animation)}>
          <Row className={c.fullwidth} data-height={70}>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("BLANK_1", areas)}
                  hypothesis={this.getHypothesis("BLANK_1", areas, hypothesis)}
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
                      area={this.getArea("BLANK_2", areas)}
                      hypothesis={this.getHypothesis("BLANK_2", areas, hypothesis)}
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
                      area={this.getArea("BLANK_3", areas)}
                      hypothesis={this.getHypothesis("BLANK_3", areas, hypothesis)}
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
                  area={this.getArea("BLANK_4", areas)}
                  hypothesis={this.getHypothesis("BLANK_4", areas, hypothesis)}
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
                      area={this.getArea("BLANK_5", areas)}
                      hypothesis={this.getHypothesis("BLANK_5", areas, hypothesis)}
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
                      area={this.getArea("BLANK_6", areas)}
                      hypothesis={this.getHypothesis("BLANK_6", areas, hypothesis)}
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
                  area={this.getArea("BLANK_7", areas)}
                  hypothesis={this.getHypothesis("BLANK_7", areas, hypothesis)}
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
                  area={this.getArea("BLANK_8", areas)}
                  hypothesis={this.getHypothesis("BLANK_8", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("BLANK_9", areas)}
                  hypothesis={this.getHypothesis("BLANK_9", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
          </Row>
          <div className={cx(c.content, c.other)}>
            <AreaTemp
              hypothesis={allHPhase2}
              selectedColor={this.state.selectedColor}
              setSelectedColor={this.setSelectedColor}
              match={match} />
          </div>
        </Container>

      </div>
    );
  }
}

export default Blank;