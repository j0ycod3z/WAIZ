import React, { Component } from "react";
import redux from 'seed/redux';

import cx from "classnames";
import { lc, lcs } from "components/util/Locales"
import { NavLink } from 'react-router-dom'

import c from "resources/css/knowledge_base/List.module.css";
import "resources/bootstrap.min.module.css";

class List extends Component
{
  render()
  {
    const { kbSections = [] } = this.props;
    const { course_id, item_id } = this.props.match.params;
    const kbSectionsF = kbSections.filter(k => k.course_id == course_id && k.items.length > 0)

    if (kbSectionsF.length == 0) return <div></div>
    const { url } = this.props.match;
    let shortUrl = url.substring(0, url.lastIndexOf('/'));

    let defaultItem = null;
    for (let s of kbSectionsF)
      for (let i of s.items)
        if (i.id == item_id)
          defaultItem = i;

    if (defaultItem == null)
      this.props.history.replace(`${shortUrl}/${kbSectionsF[0].items[0].id}`)


    const sections = kbSectionsF
    .sort((k1,k2) => k1.id - k2.id)
    .map(k =>
      <div className={c.section}>
        <div className={cx("d-flex", "justify-content-between", c.sectionHeader)}>
          <p className={cx("mb-1", c.sectionName)}>{lcs("section")} {k.index}</p>
        </div>
        <h5 className={cx("mb-1", c.sectionTitle)}>{lc(k.l_name)}</h5>
        <ul className={cx("list-group", c.items)}>
          {
            k.items
            .sort((i1,i2) => i1.id - i2.id)
            .map(i =>
              <NavLink
                className={cx("list-group-item", "list-group-item-action", c.item)}
                activeClassName={c.active}
                to={`${shortUrl}/${i.id}`}>
                <div>
                  <label
                    className={cx(
                      c.customControlLabel)}
                    for="customCheck1" >
                    {lc(i.l_title)}
                  </label>
                </div>
              </NavLink>
            )
          }
        </ul>
      </div>
    );

    return (
      <div className={cx("list-group", c.module)}>
        <div className={cx("card", c.card)}>
          <div className={cx("card-body")}>
            {sections}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount()
  {
    const { course_id } = this.props.match.params;
    this.loadData(course_id);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.match.params.course_id !== this.props.match.params.course_id)
      this.loadData(nextProps.match.params.course_id);
  }

  loadData(courseId) 
  {
    this.props.getKbSectionList({ course: courseId });
  }
}

export default redux(List);
