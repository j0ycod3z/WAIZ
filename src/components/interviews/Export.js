import React from 'react';
import { lcs } from 'components/util/Locales';
import { CSVLink } from "react-csv";

function Export(props) {
  const {
    interviews
  } = props;

  const nor = (str) => {
    const res = str.toLowerCase().replace(/_/g, ' ');
    return res.charAt(0).toUpperCase() + res.slice(1);
  };

  const data = [
    ["Transcript", "Channel", "Type", "Name", "Rol", "Company", "Contact"],
    ...interviews.map(interview => [
      interview.transcript,
      nor(interview.channel),
      nor(interview.interviewee_type),
      interview.interviewee_name,
      interview.interviewee_rol,
      interview.interviewee_company,
      interview.interviewee_contact,
    ])
  ];
  
  return (
    <CSVLink
      data={data}
      filename="interviews.csv"
      style={{ color: 'inherit' }}
    >
      {lcs("export_data")}
    </CSVLink>
  );
}

export default Export;