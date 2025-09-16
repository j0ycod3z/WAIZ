import * as React from 'react';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap'
import { lc } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'components/canvas/types/Base.module.scss'

class Exo extends Base {
  render() {
    const { type, hypothesis, match } = this.props;
    const footerLegend = type.l_legend;
    const areas = type.areas;

    const footer = footerLegend &&
      <Row className={c.footer}>
        <Col>
          {lc(footerLegend)}
        </Col>
      </Row>

    return (
      <div className={c.module}>
        <Container className={cx(c.container, c.fullwidth)}>
          <Row className={c.fullwidth} data-height={20}>
            <Col md className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("MTP", areas)}
                  hypothesis={this.getHypothesis("MTP", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
          </Row>
          <Row className={c.fullwidth} data-height={80}>
            <Col md={2} className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("INFORMATION", areas)}
                  hypothesis={this.getHypothesis("INFORMATION", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
            <Col md={4} className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("STAFF_ON_DEMAND", areas)}
                      hypothesis={this.getHypothesis("STAFF_ON_DEMAND", areas, hypothesis)}
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
                      area={this.getArea("COMMUNITY", areas)}
                      hypothesis={this.getHypothesis("COMMUNITY", areas, hypothesis)}
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
                      area={this.getArea("ALGORITHMS", areas)}
                      hypothesis={this.getHypothesis("ALGORITHMS", areas, hypothesis)}
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
                      area={this.getArea("LEVERAGED_ASSETS", areas)}
                      hypothesis={this.getHypothesis("LEVERAGED_ASSETS", areas, hypothesis)}
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
                      area={this.getArea("ENGAGEMENT", areas)}
                      hypothesis={this.getHypothesis("ENGAGEMENT", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={4} className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={c.content}>
                    <Area
                      area={this.getArea("INTERFACES", areas)}
                      hypothesis={this.getHypothesis("INTERFACES", areas, hypothesis)}
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
                      area={this.getArea("DASHBOARDS", areas)}
                      hypothesis={this.getHypothesis("DASHBOARDS", areas, hypothesis)}
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
                      area={this.getArea("EXPERIMENTATION", areas)}
                      hypothesis={this.getHypothesis("EXPERIMENTATION", areas, hypothesis)}
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
                      area={this.getArea("AUTONOMY", areas)}
                      hypothesis={this.getHypothesis("AUTONOMY", areas, hypothesis)}
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
                      area={this.getArea("SOCIAL_TECH", areas)}
                      hypothesis={this.getHypothesis("SOCIAL_TECH", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={2} className={c.col}>
              <div className={c.content}>
                <Area
                  area={this.getArea("IMPLEMENTATION", areas)}
                  hypothesis={this.getHypothesis("IMPLEMENTATION", areas, hypothesis)}
                  selectedColor={this.state.selectedColor}
                  setSelectedColor={this.setSelectedColor}
                  match={match} />
              </div>
            </Col>
          </Row>
          {footer}
        </Container>
      </div>
    );
  }
}

export default Exo;