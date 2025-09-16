import React from 'react';
import c from 'resources/css/dashboards/charts/Charts.module.css';
import cx from 'classnames';
import { lcs } from 'components/util/Locales'
import { format } from 'components/dashboards/util/Util'
import { NavLink } from 'react-router-dom';


function AnalyticCard (props)
{
    const {data, match} = props;
    const { url } = match;
    const { project_id } = match.params;

    return (
      <div className={c.module}>
        <div className={c.analyticCard}>
          <div className={c.analyticCardLeft}>
            <h3 className={c.title}>{data.name}</h3>
            <h4 className={c.week}>{format(data.industry, 100)}</h4>
          </div>
          <div className={c.btnContainer}>
            {
              project_id == null ?
                <NavLink to={`${url}/${data.id}`}>
                  <button className={c.btn}>{lcs("show_details")}</button>
                </NavLink> :
                <NavLink to={`${url.substring(0,url.lastIndexOf("/"))}`}>
                  <button className={c.btn}>{lcs("hide_details")}</button>
                </NavLink>
            }
          </div>

          <div className={c.data}>
            <h4 className={c.subtitle}>{lcs("interviews")}</h4>
            <div className={c.dataNumberContainer}>
              <div className={c.dataNumber}>
                <p className={cx(c.number)}>{data.interviews.total}</p>
                <p>{lcs("total")}</p>
              </div>
              <div className={c.dataNumber}>
                <p className={cx(c.number)}>{data.interviews.week}</p>
                <p>{lcs("week")}</p>
              </div>

            </div>
          </div>
        </div>

        <div className={c.data}>
          <h4 className={c.subtitle}>{lcs("hypotheses")}</h4>
          <div className={c.dataNumberContainer}>
            <div className={c.dataNumber}>
              <p className={cx(c.darkPurpleFont, c.number)}>{data.hypothesis.total}</p>
              <p>{lcs("all")}</p>
            </div>
            <div className={c.dataNumber}>
              <p className={cx(c.greenFont, c.number)}>{data.hypothesis.is_valid}</p>
              <p>{lcs("valid")}</p>
            </div>
            <div className={c.dataNumber}>
              <p className={cx(c.redFont, c.number)}>{data.hypothesis.is_invalid}</p>
              <p>{lcs("invalid")}</p>
            </div>
            </div>
        </div>
      </div>
    )

}

export default AnalyticCard;