import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/translations/Details.module.css";

const TRANSLATION  = `
{
  translation {
    value
    lang
    locale { }
  }
}
`;

function TranslationDetails(props) {

  const { translation_id }  = props.match.params;
  const qTranslation = useDetail(TRANSLATION, translation_id);

  if (qTranslation.loading) return <Loading />;
  if (qTranslation.error) return "Error";

  const { translation = {} } = qTranslation.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Value</label><br/>
      <label className={styles.txt}>{translation.value.toString()}</label>
      <br/>
      <label className={styles.lbl}>Lang</label><br/>
      <label className={styles.txt}>{translation.lang.toString()}</label>
      <br/>
    </div>
  );
}

export default TranslationDetails;