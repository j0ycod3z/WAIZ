import React, { Component } from 'react';
import cx from 'classnames';
import { lcs } from 'components/util/Locales';
import { CSVLink } from "react-csv";

class Export extends Component
{
  render()
  {
    const nor = str =>
    {
      let res = str.toLowerCase().replace(/_/g, " ");
      return res.charAt(0).toUpperCase() + res.slice(1)
    }

    const { interviews } = this.props;
    let data = [];
    data.push(["Transcript", "Channel", "Type", "Name", "Rol", "Company", "Contact"])
    for (let interview of interviews)
      data.push([
        interview.transcript,
        nor(interview.channel),
        nor(interview.interviewee_type),
        interview.interviewee_name,
        interview.interviewee_rol,
        interview.interviewee_company,
        interview.interviewee_contact,
      ])
    return (
      <CSVLink
        data={data}
        filename={"interviews.csv"}
        style={{color: "inherit"}}
      >{lcs("export_data")}</CSVLink>
    );
  }
}

export default Export;