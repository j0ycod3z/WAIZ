import React from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { CSVLink } from "react-csv";

import c from 'resources/css/projects/Profile.module.css';

function Export(props) {
  const { project, projectDetails } = props;

  const nor = (str) => {
    let res = str.toLowerCase().replace(/_/g, " ");
    return res.charAt(0).toUpperCase() + res.slice(1);
  };

  let data = [];
  data.push(["Name", project.name]);
  data.push(["Description", project.description]);
  data.push(["Country", nor(projectDetails.country)]);
  data.push(["Industry", nor(projectDetails.industry)]);
  data.push(["Website", projectDetails.website]);
  data.push(["Total sales", projectDetails.total_sales]);
  data.push(["Num. employees", projectDetails.num_employees]);
  data.push(["Raised capital", projectDetails.raised_capital]);
  data.push(["Inv. request", projectDetails.investment_request]);
  data.push(["Patents", projectDetails.num_patents]);

  for (let i = 0; i < projectDetails.features.length; i++)
    if (projectDetails.features[i].description != "")
    data.push([`Feature ${i + 1}`, projectDetails.features[i].description]);
  
  return (
    <div className={cx("card", c.card)}>
      <div className={cx("card-body")}>
        <h5 className={cx("card-title")}>{lcs("export_data")}</h5>
        <CSVLink data={data} className={cx("btn", "btn-md", c.buttonPrimary, c.mainButton)} filename={"project.csv"}>
          {lcs("export")}
        </CSVLink>
      </div>
    </div>
  );
}

export default Export;