import React, { Component, useEffect, useCallback  } from "react";
import { Route } from 'react-router-dom'
import redux from 'seed/redux';

import cx from "classnames";
import { lc } from "components/util/Locales"

import Select from "react-select";
import List from 'components/knowledge_base/List'
import Details from 'components/knowledge_base/Details'
import c from "resources/css/knowledge_base/Panel.module.css";
import "react-bootstrap";

function Panel(props) {
  const { kbCourses = [], getKbCourseList, history, match, showMenu = true } = props;
  const { path, url } = match;
  const { course_id } = match.params;

  const loadData = () => {
    getKbCourseList();
  };

  useEffect(() => {
    loadData();
  }, []);

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

  if (kbCourses.length == 0) return <></>;

  if (defCourse == null) {
    let shortUrl = url.substring(0, url.lastIndexOf('/'));
    history.replace(`${shortUrl}/${kbCourses[0].id}/0`)
  }

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

// class Panel extends Component {
//   render() {
//     const { kbCourses, showMenu = true } = this.props;
//     const { path, url } = this.props.match;
//     const { course_id } = this.props.match.params;

//     const defCourse = kbCourses.find((k) => k.id == course_id);
//     const courses = kbCourses.map(k => ({
//       label: lc(k.l_name),
//       value: k.id,
//     }));
    
//     const defItem = courses.find((k) => k.value == course_id);

//     if (kbCourses.length == 0) return <></>;

//     if (defCourse == null) {
//       let shortUrl = url.substring(0, url.lastIndexOf('/'));
//       this.props.history.replace(`${shortUrl}/${kbCourses[0].id}/0`)
//     }

//     return (
//       <div className={c.module}>
//         <div className={cx(c.container)}>
//           <div className={cx("row")}>
//             <div className={cx("col-lg-4")}>
//               {showMenu == true &&
//                 <Select
//                   styles={this.getSelectStyle()}
//                   value={defItem}
//                   onChange={this.onCourseChange}
//                   options={courses}
//                 />
//               }
//               <Route
//                 path={`${path}/:item_id(\\d+)`}
//                 component={List}
//               />
//             </div>
//             <div className={cx("col-lg-8")}>
//               <Route
//                 path={`${path}/:item_id(\\d+)`}
//                 component={Details}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   getSelectStyle() {
//     return {
//       control: c => ({
//         ...c,
//         backgroundColor: "rgb(17, 194, 111)",
//         border: "0px",
//         boderRadious: "3px",
//         height: '50px',
//       }),
//       singleValue: c => ({
//         ...c,
//         color: "#fff",
//         fontFamily: 'Arial',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         padding: "0px 5px"
//       }),
//       indicatorSeparator: c => ({
//         ...c,
//         backgroundColor: "rgba(255,255,255,0.8)",
//       }),
//       option: (c, state) => ({
//         ...c,
//         backgroundColor: state.isSelected ? '#409ce5' : '#fff',
//         color: state.isSelected ? '#fff' : '#333'
//       }),
//       placeholder: c => ({
//         ...c,
//         color: "rgba(255,255,255,0.8)"
//       })
//     };
//   }

//   constructor(props) {
//     super(props);
//     this.onCourseChange = this.onCourseChange.bind(this);
//   }

//   componentDidMount() {
//     this.loadData();
//   }

//   loadData() {
//     this.props.getKbCourseList();
//   }

//   onCourseChange(course) {
//     const { url } = this.props.match;
//     let shortUrl = url.substring(0, url.lastIndexOf('/'));
//     this.props.history.replace(`${shortUrl}/${course.value}/0`)
//   }
// }

export default redux(Panel);