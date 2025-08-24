import React, { useState } from "react";
import cx from 'classnames';
import { lcs } from 'components/util/Locales'
import { hasProjectPermission } from 'components/util/Permissions';

import c from 'resources/css/projects/Profile.module.css';
import c2 from 'resources/css/projects/KeyPerformanceIndicators.module.css';

function KeyPerformanceIndicators(props) {
  const { project, projectDetails: initialProjectDetails = {}, setProjectDetail } = props;

  const [editing, setEditing] = useState(false);
  const [projectDetails, setProjectDetails] = useState({ ...initialProjectDetails });
  
  const moneyFormat = (num) => {
    const n = Number(num);
    if (isNaN(n)) return '';

    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
    return n.toFixed(0);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    setProjectDetail(projectDetails.id, {
      total_sales: projectDetails.total_sales,
      num_employees: projectDetails.num_employees,
      raised_capital: projectDetails.raised_capital,
      investment_request: projectDetails.investment_request,
      num_patents: projectDetails.num_patents,
    });
  };

  const onFieldChange = (field) => (e) => {
    const value = e.target.value;
    setProjectDetails({ ...projectDetails, [field]: value })
  };

  const onClickOpen = () => setEditing(true);
  const onClickCancel = () => setEditing(false);

  const renderCard = () => {
    const salesFormat = moneyFormat(projectDetails.total_sales);
    const raisedFormat = moneyFormat(projectDetails.raised_capital);
    const investmentFormat = moneyFormat(projectDetails.investment_request);

    return (
      <div className={cx(c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("key_performance_indicators")}
            {hasProjectPermission(project, ["MEMBER"]) &&
              <button onClick={onClickOpen} className={cx(c.edit)}>
                <i className="fas fa-edit" />
              </button>
            }
          </h5>
          <table className={c2.keyPerformanceTable}>
            <tbody>
              <tr>
                <td className={c2.secondary}>
                  <i className="fas fa-coins fa-3x" />
                </td>
                <td className={c2.secondary}>
                  <i className="fas fa-users fa-3x" />
                </td>
                <td className={c2.secondary}>
                  <i className="fas fa-money-bill fa-3x" />
                </td>
                <td className={c2.secondary}>
                  <i className="fas fa-money-check-alt fa-3x" />
                </td>
                <td className={c2.secondary}>
                  <i className="fas fa-file-signature fa-3x" />
                </td>
              </tr>
              <tr className={c2.subtitle}>
                <td>{lcs("sales")}</td>
                <td>{lcs("employees")}</td>
                <td>{lcs("raised_capital")}</td>
                <td>{lcs("investment_request")}</td>
                <td>{lcs("patents")}</td>
              </tr>
              <tr className={c2.featuresNumbers}>
                <td>{`$${salesFormat}`}<small> USD</small></td>
                <td>{projectDetails.num_employees > 0 ? projectDetails.num_employees : "n/a"}</td>
                <td>{`$${raisedFormat}`}<small> USD</small></td>
                <td>{`$${investmentFormat}`}<small> USD</small></td>
                <td>{projectDetails.num_patents > 0 ? projectDetails.num_patents : "n/a"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className={cx(c.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title", c.cardTitle)}>
            {lcs("key_performance_indicators")}
          </h5>
          <form onSubmit={onSubmit}>
            <table className={c2.keyPerformanceTable}>
              <tbody>
                <tr>
                  <td className={c2.secondary}>
                    <i className="fas fa-coins fa-3x" />
                  </td>
                  <td className={c2.secondary}>
                    <i className="fas fa-users fa-3x" />
                  </td>
                  <td className={c2.secondary}>
                    <i className="fas fa-money-bill fa-3x" />
                  </td>
                  <td className={c2.secondary}>
                    <i className="fas fa-money-check-alt fa-3x" />
                  </td>
                  <td className={c2.secondary}>
                    <i className="fas fa-file-signature fa-3x" />
                  </td>
                </tr>
                <tr className={c2.subtitle}>
                  <td>{lcs("sales")}</td>
                  <td>{lcs("employees")}</td>
                  <td>{lcs("raised_capital")}</td>
                  <td>{lcs("investment_request")}</td>
                  <td>{lcs("patents")}</td>
                </tr>
                <tr className={c2.featuresNumbers}>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="USD"
                      className={cx("form-control", c.input)}
                      name="sales"
                      value={projectDetails.total_sales}
                      onChange={onFieldChange('total_sales')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="#"
                      className={cx("form-control", c.input)}
                      name="employees"
                      value={projectDetails.num_employees}
                      onChange={onFieldChange('num_employees')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="USD"
                      className={cx("form-control", c.input)}
                      name="investors"
                      value={projectDetails.raised_capital}
                      onChange={onFieldChange('raised_capital')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="USD"
                      className={cx("form-control", c.input)}
                      name="partnerships"
                      value={projectDetails.investment_request}
                      onChange={onFieldChange('investment_request')}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      placeholder="#"
                      className={cx("form-control", c.input)}
                      name="patents"
                      value={projectDetails.num_patents}
                      onChange={onFieldChange('num_patents')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={cx(c.btnContainer)}>
              <button type="submit" className={cx("btn", c.buttonGreen)}>
                {lcs("save_changes")}
              </button>
              <button type="button" className={cx("btn", "btn-light")} onClick={onClickCancel}>
                {lcs("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  return <>{editing ? renderForm() : renderCard()}</>;
}

export default KeyPerformanceIndicators;