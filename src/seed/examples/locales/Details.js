import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/locales/Details.module.css";

const LOCALE  = `
{
  locale {
    ref
    translations { }
  }
}
`;

function LocaleDetails(props) {

  const { locale_id }  = props.match.params;
  const qLocale = useDetail(LOCALE, locale_id);

  if (qLocale.loading) return <Loading />;
  if (qLocale.error) return "Error";

  const { locale = {} } = qLocale.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Ref</label><br/>
      <label className={styles.txt}>{locale.ref.toString()}</label>
      <br/>
    </div>
  );
}

export default LocaleDetails;