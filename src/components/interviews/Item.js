import React from 'react';
import { lcs, getDate } from 'components/util/Locales'
import "react-bootstrap";

function Item(props) {
  const { interview: {
    interviewee_type,
    interviewee_name,
    created_at,
  }} = props;

  return (
    <div>
      <div className={"d-flex w-100 justify-content-between"}>
        <h5 className={"mb-1"}>{interviewee_name}</h5>
      </div>
      <div className={"d-flex w-100 justify-content-between"}>
        <span style={{color: '#777'}}>
          {lcs(interviewee_type.toLowerCase())} - {getDate(created_at)}
        </span>
      </div>
    </div>
  );
}

export default Item;