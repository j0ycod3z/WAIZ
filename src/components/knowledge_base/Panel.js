import React, { useEffect, useCallback  } from "react";
import { Route } from 'react-router-dom'
import redux from 'seed/redux';

import cx from "classnames";
import { lc } from "components/util/Locales"

import Select from "react-select";
import List from 'components/knowledge_base/List'
import Details from 'components/knowledge_base/Details'
import c from "resources/css/knowledge_base/Panel.module.css";

function Panel(props) {
  const { kbCourses = [], getKbCourseList, history, match, showMenu = true } = props;
  const { path, url } = match;
  const { course_id } = match.params;

  useEffect(() => {
    getKbCourseList();
  }, [getKbCourseList]);

  const defCourse = kbCourses.find((k) => k.id == course_id);
  const courses = kbCourses.map(k => ({
    label: lc(k.l_name),
    value: k.id,
  }));
  
  const defItem = courses.find((k) => k.value == course_id);
  
  const onCourseChange = useCallback((course) => {
    const shortUrl = url.substring(0, url.lastIndexOf('/'));
    history.replace(`${shortUrl}/${course.value}/0`);
  }, [history, url]);

  const getSelectStyle = () => ({
    control: (base) => ({
      ...base,
      backgroundColor: "rgb(17, 194, 111)",
      border: "0px",
      borderRadius: "3px",
      height: "50px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: "14px",
      padding: "0px 5px",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "rgba(255,255,255,0.8)",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#409ce5" : "#fff",
      color: state.isSelected ? "#fff" : "#333",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255,255,255,0.8)",
    }),
  });

  useEffect(() => {
    if (kbCourses.length > 0 && (defCourse === null || defCourse === undefined)) {
      let shortUrl = url.substring(0, url.lastIndexOf('/'));
      history.replace(`${shortUrl}/${kbCourses[0].id}/0`);
    }
  }, [kbCourses, defCourse, url, history]);

  if (kbCourses.length == 0) return <></>

  return (
    <div className={c.module}>
      <div className={cx(c.container)}>
        <div className={cx("row")}>
          <div className={cx("col-lg-4")}>
            {showMenu == true &&
              <Select
                styles={getSelectStyle()}
                value={defItem}
                onChange={onCourseChange}
                options={courses}
              />
            }
            <Route
              path={`${path}/:item_id(\\d+)`}
              component={List}
            />
          </div>
          <div className={cx("col-lg-8")}>
            <Route
              path={`${path}/:item_id(\\d+)`}
              component={Details}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default redux(Panel);