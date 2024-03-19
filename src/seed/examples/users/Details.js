import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/users/Details.module.css";

const USER  = `
{
  user {
    username
    firstName
    lastName
    email
    isActive
    imageUrl
    color
    lang
    plan
    verificationToken
    isVerified
    introStatus
    v4Ref
  }
}
`;

function UserDetails(props) {

  const { user_id }  = props.match.params;
  const qUser = useDetail(USER, user_id);

  if (qUser.loading) return <Loading />;
  if (qUser.error) return "Error";

  const { user = {} } = qUser.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Image url</label><br/>
      <label className={styles.txt}>{user.imageUrl.toString()}</label>
      <br/>
      <label className={styles.lbl}>Color</label><br/>
      <label className={styles.txt}>{user.color.toString()}</label>
      <br/>
      <label className={styles.lbl}>Lang</label><br/>
      <label className={styles.txt}>{user.lang.toString()}</label>
      <br/>
      <label className={styles.lbl}>Plan</label><br/>
      <label className={styles.txt}>{user.plan.toString()}</label>
      <br/>
      <label className={styles.lbl}>Verification token</label><br/>
      <label className={styles.txt}>{user.verificationToken.toString()}</label>
      <br/>
      <label className={styles.lbl}>Is verified</label><br/>
      <label className={styles.txt}>{user.isVerified.toString()}</label>
      <br/>
      <label className={styles.lbl}>Intro status</label><br/>
      <label className={styles.txt}>{user.introStatus.toString()}</label>
      <br/>
      <label className={styles.lbl}>V4 ref</label><br/>
      <label className={styles.txt}>{user.v4Ref.toString()}</label>
      <br/>
    </div>
  );
}

export default UserDetails;