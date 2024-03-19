import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/interviews/Details.module.css";

const INTERVIEW  = `
{
  interview {
    transcript
    channel
    intervieweeType
    intervieweeName
    intervieweeRol
    intervieweeCompany
    intervieweeContact
    v4Ref
    intervieweeTag { }
    hypothesis { }
    canvas { }
    project { }
    creator { }
  }
}
`;

function InterviewDetails(props) {

  const { interview_id }  = props.match.params;
  const qInterview = useDetail(INTERVIEW, interview_id);

  if (qInterview.loading) return <Loading />;
  if (qInterview.error) return "Error";

  const { interview = {} } = qInterview.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Transcript</label><br/>
      <label className={styles.txt}>{interview.transcript.toString()}</label>
      <br/>
      <label className={styles.lbl}>Channel</label><br/>
      <label className={styles.txt}>{interview.channel.toString()}</label>
      <br/>
      <label className={styles.lbl}>Interviewee type</label><br/>
      <label className={styles.txt}>{interview.intervieweeType.toString()}</label>
      <br/>
      <label className={styles.lbl}>Interviewee name</label><br/>
      <label className={styles.txt}>{interview.intervieweeName.toString()}</label>
      <br/>
      <label className={styles.lbl}>Interviewee rol</label><br/>
      <label className={styles.txt}>{interview.intervieweeRol.toString()}</label>
      <br/>
      <label className={styles.lbl}>Interviewee company</label><br/>
      <label className={styles.txt}>{interview.intervieweeCompany.toString()}</label>
      <br/>
      <label className={styles.lbl}>Interviewee contact</label><br/>
      <label className={styles.txt}>{interview.intervieweeContact.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{interview.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default InterviewDetails;