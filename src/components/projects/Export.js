import React, { Component } from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { CSVLink } from "react-csv";

import 'react-bootstrap';
import styles from 'resources/css/projects/Profile.module.css';


class Export extends Component
{
  render()
  {
    const nor = str =>
    {
      let res = str.toLowerCase().replace(/_/g, " ");
      return res.charAt(0).toUpperCase() + res.slice(1)
    }

    const { project, projectDetails } = this.props;
    let data = [];
    data.push(["Name", project.name])
    data.push(["Description", project.description])
    data.push(["Country", nor(projectDetails.country)])
    data.push(["Industry", nor(projectDetails.industry)])
    data.push(["Website", projectDetails.website])
    data.push(["Total sales", projectDetails.total_sales])
    data.push(["Num. employees", projectDetails.num_employees])
    data.push(["Raised capital", projectDetails.raised_capital])
    data.push(["Inv. request", projectDetails.investment_request])
    data.push(["Patents", projectDetails.num_patents])
    for (let i = 0; i < projectDetails.features.length; i++)
      if (projectDetails.features[i].description != "")
      data.push(["Feature " + (i + 1), projectDetails.features[i].description]);

    return (
      <div className={cx("card", styles.card)}>
        <div className={cx("card-body")}>
          <h5 className={cx("card-title")}>{lcs("export_data")}</h5>
          <CSVLink
            data={data}
            className={cx("btn", "btn-md", styles.buttonPrimary, styles.openButton)}
            filename={"project.csv"}
            style={{ float: "right", marginTop: "-35px" }}
          >{lcs("export")}</CSVLink>
        </div>
      </div>
    );
  }
}

export default Export;