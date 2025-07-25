import React, { Component } from "react";
import { Route } from 'react-router-dom'
import redux from 'seed/redux';

import cx from "classnames";
import { lc } from "components/util/Locales"

import Select from "react-select";
import List from 'components/knowledge_base/List'
import Details from 'components/knowledge_base/Details'
import c from "resources/css/knowledge_base/Panel.module.css";
import "react-bootstrap";

class Panel extends Component
{
  render()
  {
    const kbCourses = this.props.kbCourses;
    if (kbCourses.length == 0) return <div></div>

    let courses = kbCourses.map(k =>
    {
      return {
        label: lc(k.l_name),
        value: k.id
      }
    });

    const { showMenu = true } = this.props;
    const { path, url } = this.props.match;
    const { course_id } = this.props.match.params;

    let defCourse = kbCourses.filter(k => k.id == course_id)[0];
    let defItem = courses.filter(k => k.value == course_id)[0];
    if (defCourse == null) {
      let shortUrl = url.substring(0, url.lastIndexOf('/'));
      this.props.history.replace(`${shortUrl}/${kbCourses[0].id}/0`)
    }

    const menu = showMenu == true ?
      <Select
        styles={this.getSelectStyle()}
        value={defItem}
        onChange={this.onCourseChange}
        options={courses} /> : null;

    return (
      <div className={c.module}>
        <div className={cx("container", c.container)}>

          <div className={cx("row")}>
            <div className={cx("col-lg-4")}>
              {menu}
              <Route
                path={`${path}/:item_id(\\d+)`}
                component={List} />
            </div>
            <div className={cx("col-lg-8")}>
              <Route
                path={`${path}/:item_id(\\d+)`}
                component={Details} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  getSelectStyle()
  {
    return {
      control: c => ({
        ...c,
        backgroundColor: "rgb(17, 194, 111)",
        border: "0px",
        boderRadious: "3px",
        height: '50px',
      }),
      singleValue: c => ({
        ...c,
        color: "#fff",
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: '14px',
        padding: "0px 5px"
      }),
      indicatorSeparator: c => ({
        ...c,
        backgroundColor: "rgba(255,255,255,0.8)",
      }),
      option: (c, state) => ({
        ...c,
        backgroundColor: state.isSelected ? '#409ce5' : '#fff',
        color: state.isSelected ? '#fff' : '#333'
      }),
      placeholder: c => ({
        ...c,
        color: "rgba(255,255,255,0.8)"
      })
    };
  }

  constructor(props)
  {
    super(props);
    this.onCourseChange = this.onCourseChange.bind(this);
  }

  componentDidMount()
  {
    this.loadData();
  }

  loadData() 
  {
    this.props.getKbCourseList();
  }

  onCourseChange(course)
  {
    const { url } = this.props.match;
    let shortUrl = url.substring(0, url.lastIndexOf('/'));
    this.props.history.replace(`${shortUrl}/${course.value}/0`)
  }
}

export default redux(Panel);
