import React, { useEffect } from "react";
import redux from 'seed/redux';

import cx from "classnames";
import { lc, lcs } from "components/util/Locales"
import { NavLink } from 'react-router-dom'

import c from "resources/css/knowledge_base/List.module.css";
import "react-bootstrap";

function List(props) {
  const { kbSections = [], getKbSectionList, match, history } = props;
  const { course_id, item_id } = match.params;
  const { url } = match;

  const kbSectionsF = kbSections.filter((k) => k.course_id == course_id && k.items.length > 0);

  const shortUrl = url.substring(0, url.lastIndexOf('/'));

  useEffect(() => {
    getKbSectionList({ course: course_id });
  }, [course_id, getKbSectionList]);

  useEffect(() => {
    if ( kbSectionsF.length > 0 && !kbSectionsF.some(s => s.items.some(i => i.id == item_id))){
      history.replace(`${shortUrl}/${kbSectionsF[0].items[0].id}`);
    }
  }, [kbSectionsF, item_id, history, shortUrl]);

  if (kbSectionsF.length == 0) return <></>;

  const sections = kbSectionsF
  .sort((k1, k2) => k1.id - k2.id)
  .map((k) =>
    <div key={k.id}>
      <div className={cx("d-flex", "justify-content-between", c.sectionHeader)}>
        <p className={cx("mb-1", c.sectionName)}>
          {lcs("section")} {k.index}
        </p>
      </div>
      <h5 className={cx("mb-1", c.sectionTitle)}>{lc(k.l_name)}</h5>
      <div className={cx("list-group", c.items)}>
        { k.items
          .sort((i1, i2) => i1.id - i2.id)
          .map((i) =>
            <NavLink
              className={cx("list-group-item", "list-group-item-action", c.item)}
              activeClassName={c.active}
              to={`${shortUrl}/${i.id}`}
              key={i.id}
            >
              <span
                className={cx(c.customControlLabel)}
              >
                {lc(i.l_title)}
              </span>
            </NavLink>
          )
        }
      </div>
    </div>
  );

  return (
    <div className={cx("list-group", c.module)}>
      <div className={cx("card", c.card)}>
        {sections}
      </div>
    </div>
  );
}

export default redux(List);