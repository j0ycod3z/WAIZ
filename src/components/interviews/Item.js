import * as React from 'react';
import cx from "classnames";
import { lcs, getDate, lang } from 'components/util/Locales'
import "react-bootstrap";
import 'resources/css/interviews/Interviews.css';

class Item extends React.Component
{
  render()
  {
    const { interview } = this.props;

    let type = interview.interviewee_type == "CUSTOMER" ? "customer" : "expert";

    return (
      <div>
        <div className={"d-flex w-100 justify-content-between"}>
          <h5 className={"mb-1"}>{interview.interviewee_name}</h5>
        </div>
        <div className={"d-flex w-100 justify-content-between"}>
          <p className={"mb-1"}>{lcs(type)} - {getDate(interview.created_at)}</p>
        </div>
      </div>
    );
  }
}

export default Item;
