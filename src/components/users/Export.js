import React from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { CSVLink } from "react-csv";

import c from 'components/users/Profile.module.scss';

function Export(props) {
  const { profile } = props;

  const nor = (str) => {
    let res = str.toLowerCase().replace(/_/g, " ");
    return res.charAt(0).toUpperCase() + res.slice(1);
  };

  let data = [];

  data.push(["Name", `${profile.user.first_name} ${profile.user.last_name}`])
  data.push(["Gender", profile.gender])
  data.push(["Age", profile.age])
  data.push(["Bio", profile.bio])
  data.push(["Made", profile.made])
  data.push(["Country", nor(profile.country)])
  data.push(["Industry", nor(profile.industry)])
  data.push(["Website", profile.website])
  data.push(["Linkedin", profile.linkedin])
  data.push(["Github", profile.github])
  data.push(["Facebook", profile.facebook])
  data.push(["Twitter", profile.twitter])
  data.push(["Angel List", profile.angel_list])
  
  for (let i = 0; i < profile.laborals.length; i++) {
    if (profile.laborals[i].job !== "") {
      data.push([
        `Work experience ${i + 1}`,
        `${profile.laborals[i].job} (${profile.laborals[i].company})`
      ]);
    }
  }

  for (let i = 0; i < profile.educations.length; i++) {
    if (profile.educations[i].degree !== "" && profile.educations[i].university != null) {
      data.push([
        `Educations ${i + 1}`,
        `${profile.educations[i].university.name} (${profile.educations[i].degree})`
      ]);
    }
  }

  return (
    <div className={cx(c.card)}>
      <div className={cx("card-body")}>
        <h5 className={cx("card-title")}>{lcs("export_data")}</h5>
        <CSVLink
          data={data}
          className={cx("btn", "btn-md", c.buttonPrimary, c.openButton)}
          filename={"profile.csv"}
        >
          {lcs("export")}
        </CSVLink>
      </div>
    </div>
  );
}

export default Export;