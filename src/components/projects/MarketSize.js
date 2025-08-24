import React, { useState } from "react";
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { hasProjectPermission } from 'components/util/Permissions';

import c from 'resources/css/projects/Profile.module.css';
import c2 from 'resources/css/projects/MarketSize.module.css';

function MarketSize(props) {
  const { projectDetails = {}, project, setProjectDetail } = props;

  const [editing, setEditing] = useState(false);
  const [currentDetails, setCurrentDetails] = useState({ ...projectDetails });

  const total = projectDetails.total_available_market;
  const totalS = currentDetails.total_available_market;
  const served = projectDetails.served_available_market;
  const servedS = currentDetails.served_available_market;
  const target = projectDetails.target_market;
  const targetS = currentDetails.target_market;

  const format = (num) => {
    const n = Number(num);
    if (isNaN(n)) return '';

    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toFixed(0);
  };

  const renderInput = (type, value, onChange) => (
    <input
      type="number"
      placeholder="USD"
      className={cx("form-control", c.input)}
      name={type}
      min={0}
      onChange={onChange}
      value={value}
    />
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    setProjectDetail(currentDetails.id, {
      total_available_market: currentDetails.total_available_market,
      served_available_market: currentDetails.served_available_market,
      target_market: currentDetails.target_market,
    });
  };

  const onFieldChange = (field) => (e) => {
    const value = e.target.value;
    setCurrentDetails({ ...currentDetails, [field]: value })
  };
  
  const onClickOpen = () => setEditing(true);
  const onClickCancel = () => setEditing(false);

  return (
    <div className={cx(c.card)}>
      <div className={cx("card-body")}>
        <h5 className={cx("card-title", c.cardTitle)}>
          {lcs("market_size")}
          {!(editing && hasProjectPermission(project, ["MEMBER"])) &&
            <button onClick={onClickOpen} className={cx(c.edit)}>
              <i className="fas fa-edit" />
            </button>
          }
        </h5>
        <div className={"row"}>
          <div className={cx("col-sm-5")}>
            <form onSubmit={onSubmit}>
              <ol className={cx(c.orderedList)}>
                <li>
                  {lcs("total_avaliable_market")}
                  <br />
                  {editing ?
                    renderInput("total", totalS, onFieldChange("total_available_market")) :
                    <span className={c2.fancyNumber}>
                      {`$${format(total)}`}
                      <small> USD</small>
                    </span>
                  }
                </li>
                <li>
                  {lcs("server_avaliable_market")}
                  <br />
                  {editing ?
                    renderInput("served", servedS, onFieldChange("served_available_market")) :
                    <span className={c2.fancyNumber}>
                      {`$${format(served)}`}
                      <small> USD</small>
                    </span>
                  }
                </li>
                <li>
                  {lcs("target_market")}
                  <br />
                  {editing ?
                    renderInput("target", targetS, onFieldChange("target_market")) :
                    <span className={c2.fancyNumber}>
                      {`$${format(target)}`}
                      <small> USD</small>
                    </span>
                  }
                </li>
              </ol>
              {editing &&
                <div className={cx(c.btnContainer)}>
                  <button type="submit" className={cx("btn", c.buttonGreen)}>
                    {lcs("save_changes")}
                  </button>
                  <button type="button" className={cx("btn", "btn-light")} onClick={onClickCancel}>
                    {lcs("cancel")}
                  </button>
                </div>
              }
            </form>
          </div>
          <div className={cx("col-lg-6", "d-flex", "justify-content-center")}>
            <div className={c2.marketChart}>
              <div className={c2.total}>
                <div
                  className={c2.server}
                  style={{
                    opacity: served > 0 ? 1 : 0,
                    width: 100 / Math.sqrt(total / served) + "%",
                  }}
                >
                  <div
                    className={c2.target}
                    style={{
                      opacity: served > 0 ? 1 : 0,
                      width: 100 / Math.sqrt(served / target) + "%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketSize;