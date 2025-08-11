import * as React from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'

import Area from 'components/canvas/Area'
import Base from 'components/canvas/types/Base';

import c from 'resources/css/canvas/types/Base.module.css'
import c2 from 'resources/css/canvas/types/Scaling.module.css'

class Scaling extends Base {
  render() {
    const { type, hypothesis, match } = this.props;
    const areas = type.areas;

    return (
      <div className={c.module}>
        <div className={cx(c.container, c.fullwidth)}>
          <div className={cx(c2.parent)}>
            <div className={cx('d-flex', 'flex-column')}>
              <b>{lcs("organization_core")}</b>
              <div className={cx('d-flex', 'flex-column', c2.contDiv)}>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("MTP_S", areas)}
                    hypothesis={this.getHypothesis("MTP_S", areas, hypothesis)}
                    maxHypothesis={1}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("MTU", areas)}
                    hypothesis={this.getHypothesis("MTU", areas, hypothesis)}
                    maxHypothesis={1}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("ORGANIZATIONAL_VALUES", areas)}
                    hypothesis={this.getHypothesis("ORGANIZATIONAL_VALUES", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("ORGANIZATION_KPI", areas)}
                    hypothesis={this.getHypothesis("ORGANIZATION_KPI", areas, hypothesis)}
                    maxHypothesis={1}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("STRENGTHS_S", areas)}
                    hypothesis={this.getHypothesis("STRENGTHS_S", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
              </div>
            </div>
            <div className={cx('d-flex', 'flex-column')}>
              <b>{lcs("qtr")}</b>
              <div className={cx('d-flex', 'flex-column', c2.contDiv)}>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("FINANCIAL_TARGETS_Q", areas)}
                    hypothesis={this.getHypothesis("FINANCIAL_TARGETS_Q", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("GOAL_FOR_PEOPLE_Q", areas)}
                    hypothesis={this.getHypothesis("GOAL_FOR_PEOPLE_Q", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("GOAL_FOR_PROCESSES_Q", areas)}
                    hypothesis={this.getHypothesis("GOAL_FOR_PROCESSES_Q", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("KEY_ACTIONS_S", areas)}
                    hypothesis={this.getHypothesis("KEY_ACTIONS_S", areas, hypothesis)}
                    maxHypothesis={5}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("WEEKNESSES_S", areas)}
                    hypothesis={this.getHypothesis("WEEKNESSES_S", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
              </div>
            </div>
            <div className={cx('d-flex', 'flex-column')}>
              <b>{lcs("one_year")}</b>
              <div className={cx('d-flex', 'flex-column', c2.contDiv)}>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("FINANCIAL_TARGETS_Y", areas)}
                    hypothesis={this.getHypothesis("FINANCIAL_TARGETS_Y", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("GOAL_FOR_PEOPLE_Y", areas)}
                    hypothesis={this.getHypothesis("GOAL_FOR_PEOPLE_Y", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("GOAL_FOR_PROCESSES_Y", areas)}
                    hypothesis={this.getHypothesis("GOAL_FOR_PROCESSES_Y", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("KEY_INITIATIVES_S", areas)}
                    hypothesis={this.getHypothesis("KEY_INITIATIVES_S", areas, hypothesis)}
                    maxHypothesis={5}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("TRENDS_S", areas)}
                    hypothesis={this.getHypothesis("TRENDS_S", areas, hypothesis)}
                    maxHypothesis={6}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
              </div>
            </div>
            <div className={cx('d-flex', 'flex-column')}>
              <b>{lcs("three_five_years")}</b>
              <div className={cx('d-flex', 'flex-column', c2.contDiv)}>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("FINANCIAL_TARGETS_YY", areas)}
                    hypothesis={this.getHypothesis("FINANCIAL_TARGETS_YY", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("CUSTOMER_S", areas)}
                    hypothesis={this.getHypothesis("CUSTOMER_S", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("VALUE_PROPOSITION_S", areas)}
                    hypothesis={this.getHypothesis("VALUE_PROPOSITION_S", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("GROWTH_GOALS", areas)}
                    hypothesis={this.getHypothesis("GROWTH_GOALS", areas, hypothesis)}
                    maxHypothesis={5}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("VALUE_PROPOSITION_KPIS", areas)}
                    hypothesis={this.getHypothesis("VALUE_PROPOSITION_KPIS", areas, hypothesis)}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
              </div>
            </div>
            <div className={cx('d-flex', 'flex-column')}>
              <b>{lcs("kpis")}</b>
              <div className={cx('d-flex', 'flex-column', c2.contDiv)}>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("EMPLOYEES_KPIS", areas)}
                    hypothesis={this.getHypothesis("EMPLOYEES_KPIS", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("CUSTOMERS_KPIS", areas)}
                    hypothesis={this.getHypothesis("CUSTOMERS_KPIS", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("SHAREHOLDERS_KPIS", areas)}
                    hypothesis={this.getHypothesis("SHAREHOLDERS_KPIS", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("PURCHASES_KPIS", areas)}
                    hypothesis={this.getHypothesis("PURCHASES_KPIS", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
                <div className={cx(c.content, c2.content)}>
                  <Area
                    area={this.getArea("SALES_KPIS", areas)}
                    hypothesis={this.getHypothesis("SALES_KPIS", areas, hypothesis)}
                    maxHypothesis={3}
                    selectedColor={this.state.selectedColor}
                    setSelectedColor={this.setSelectedColor}
                    match={match} />
                </div>
              </div>
            </div>
          </div>
          {/* <Row>
            <Col md className={cx(c.col, c.header)}>
              <b>{lcs("organization_core")}</b>
            </Col>
            <Col md className={cx(c.col, c.header)}>
              <b>{lcs("qtr")}</b>
            </Col>
            <Col md className={cx(c.col, c.header)}>
              <b>{lcs("one_year")}</b>
            </Col>
            <Col md className={cx(c.col, c.header)}>
              <b>{lcs("three_five_years")}</b>
            </Col>
            <Col md className={cx(c.col, c.header)}>
              <b>{lcs("kpis")}</b>
            </Col>
          </Row>
          <Row className={c.fullwidth} data-height={100}>
            <Col md className={c.innercol}>
              <Row>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("MTP_S", areas)}
                      hypothesis={this.getHypothesis("MTP_S", areas, hypothesis)}
                      maxHypothesis={1}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("FINANCIAL_TARGETS_Q", areas)}
                      hypothesis={this.getHypothesis("FINANCIAL_TARGETS_Q", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("FINANCIAL_TARGETS_Y", areas)}
                      hypothesis={this.getHypothesis("FINANCIAL_TARGETS_Y", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("FINANCIAL_TARGETS_YY", areas)}
                      hypothesis={this.getHypothesis("FINANCIAL_TARGETS_YY", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("EMPLOYEES_KPIS", areas)}
                      hypothesis={this.getHypothesis("EMPLOYEES_KPIS", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("MTU", areas)}
                      hypothesis={this.getHypothesis("MTU", areas, hypothesis)}
                      maxHypothesis={1}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("GOAL_FOR_PEOPLE_Q", areas)}
                      hypothesis={this.getHypothesis("GOAL_FOR_PEOPLE_Q", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("GOAL_FOR_PEOPLE_Y", areas)}
                      hypothesis={this.getHypothesis("GOAL_FOR_PEOPLE_Y", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("CUSTOMER_S", areas)}
                      hypothesis={this.getHypothesis("CUSTOMER_S", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("CUSTOMERS_KPIS", areas)}
                      hypothesis={this.getHypothesis("CUSTOMERS_KPIS", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("ORGANIZATIONAL_VALUES", areas)}
                      hypothesis={this.getHypothesis("ORGANIZATIONAL_VALUES", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("GOAL_FOR_PROCESSES_Q", areas)}
                      hypothesis={this.getHypothesis("GOAL_FOR_PROCESSES_Q", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("GOAL_FOR_PROCESSES_Y", areas)}
                      hypothesis={this.getHypothesis("GOAL_FOR_PROCESSES_Y", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("VALUE_PROPOSITION_S", areas)}
                      hypothesis={this.getHypothesis("VALUE_PROPOSITION_S", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("SHAREHOLDERS_KPIS", areas)}
                      hypothesis={this.getHypothesis("SHAREHOLDERS_KPIS", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("ORGANIZATION_KPI", areas)}
                      hypothesis={this.getHypothesis("ORGANIZATION_KPI", areas, hypothesis)}
                      maxHypothesis={1}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("KEY_ACTIONS_S", areas)}
                      hypothesis={this.getHypothesis("KEY_ACTIONS_S", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("KEY_INITIATIVES_S", areas)}
                      hypothesis={this.getHypothesis("KEY_INITIATIVES_S", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("GROWTH_GOALS", areas)}
                      hypothesis={this.getHypothesis("GROWTH_GOALS", areas, hypothesis)}
                      maxHypothesis={5}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("PURCHASES_KPIS", areas)}
                      hypothesis={this.getHypothesis("PURCHASES_KPIS", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("STRENGTHS_S", areas)}
                      hypothesis={this.getHypothesis("STRENGTHS_S", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("WEEKNESSES_S", areas)}
                      hypothesis={this.getHypothesis("WEEKNESSES_S", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("TRENDS_S", areas)}
                      hypothesis={this.getHypothesis("TRENDS_S", areas, hypothesis)}
                      maxHypothesis={6}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("VALUE_PROPOSITION_KPIS", areas)}
                      hypothesis={this.getHypothesis("VALUE_PROPOSITION_KPIS", areas, hypothesis)}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
                <Col md className={c.col}>
                  <div className={cx(c.content, c2.content)}>
                    <Area
                      area={this.getArea("SALES_KPIS", areas)}
                      hypothesis={this.getHypothesis("SALES_KPIS", areas, hypothesis)}
                      maxHypothesis={3}
                      selectedColor={this.state.selectedColor}
                      setSelectedColor={this.setSelectedColor}
                      match={match} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row> */}
          <div className={c.brand}>{lcs("made_in_canou")}</div>
        </div>

      </div>
    );
  }
}

export default Scaling;