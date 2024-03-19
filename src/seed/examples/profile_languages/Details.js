import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profile_languages/Details.module.css";

const PROFILE_LANGUAGE  = `
{
  profileLanguage {
    name
    profile { }
  }
}
`;

function ProfileLanguageDetails(props) {

  const { profile_language_id }  = props.match.params;
  const qProfileLanguage = useDetail(PROFILE_LANGUAGE, profile_language_id);

  if (qProfileLanguage.loading) return <Loading />;
  if (qProfileLanguage.error) return "Error";

  const { profileLanguage = {} } = qProfileLanguage.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Name</label><br/>
      <label className={styles.txt}>{profileLanguage.name.toString()}</label>
      <br/>
    </div>
  );
}

export default ProfileLanguageDetails;