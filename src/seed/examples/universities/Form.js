import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/universities/Form.module.css";

function UniversityForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { university_id }  = props.match.params;
  const editMode = university_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_UNIVERSITY, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_UNIVERSITY, saveOptions);

  const qUniversity = useDetail(queries.UNIVERSITY, university_id);

  if (editMode && qUniversity.loading) return <Loading />;
  if (editMode && qUniversity.error) return "Error";

  const onSubmit = (values) => {
    values.id = university_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { university = {} } = qUniversity.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>University</div>
      <div className={styles.form}>
        <Formik
           initialValues={university}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Name</label><br/>
          <Field type="text" name="name"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Country</label>
          <Field component="select" name="country.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="AFGHANISTAN">AFGHANISTAN</option>
            <option value="ALBANIA">ALBANIA</option>
            <option value="ALGERIA">ALGERIA</option>
            <option value="ANDORRA">ANDORRA</option>
            <option value="ANGOLA">ANGOLA</option>
            <option value="ANTIGUA_AND_BARBUDA">ANTIGUA_AND_BARBUDA</option>
            <option value="ARGENTINA">ARGENTINA</option>
            <option value="ARMENIA">ARMENIA</option>
            <option value="AUSTRALIA">AUSTRALIA</option>
            <option value="AUSTRIA">AUSTRIA</option>
            <option value="AZERBAIJAN">AZERBAIJAN</option>
            <option value="THE_BAHAMAS">THE_BAHAMAS</option>
            <option value="BAHRAIN">BAHRAIN</option>
            <option value="BANGLADESH">BANGLADESH</option>
            <option value="BARBADOS">BARBADOS</option>
            <option value="BELARUS">BELARUS</option>
            <option value="BELGIUM">BELGIUM</option>
            <option value="BELIZE">BELIZE</option>
            <option value="BENIN">BENIN</option>
            <option value="BHUTAN">BHUTAN</option>
            <option value="BOLIVIA">BOLIVIA</option>
            <option value="BOSNIA_AND_HERZEGOVINA">BOSNIA_AND_HERZEGOVINA</option>
            <option value="BOTSWANA">BOTSWANA</option>
            <option value="BRAZIL">BRAZIL</option>
            <option value="BRUNEI">BRUNEI</option>
            <option value="BULGARIA">BULGARIA</option>
            <option value="BURKINA_FASO">BURKINA_FASO</option>
            <option value="BURUNDI">BURUNDI</option>
            <option value="CABO_VERDE">CABO_VERDE</option>
            <option value="CAMBODIA">CAMBODIA</option>
            <option value="CAMEROON">CAMEROON</option>
            <option value="CANADA">CANADA</option>
            <option value="CENTRAL_AFRICAN_REPUBLIC">CENTRAL_AFRICAN_REPUBLIC</option>
            <option value="CHAD">CHAD</option>
            <option value="CHILE">CHILE</option>
            <option value="CHINA">CHINA</option>
            <option value="COLOMBIA">COLOMBIA</option>
            <option value="COMOROS">COMOROS</option>
            <option value="DEMOCRATIC_REPUBLIC_OF_THE_CONGO">DEMOCRATIC_REPUBLIC_OF_THE_CONGO</option>
            <option value="REPUBLIC_OF_THE_CONGO">REPUBLIC_OF_THE_CONGO</option>
            <option value="COSTA_RICA">COSTA_RICA</option>
            <option value="COTE_DIVOIRE">COTE_DIVOIRE</option>
            <option value="CROATIA">CROATIA</option>
            <option value="CUBA">CUBA</option>
            <option value="CYPRUS">CYPRUS</option>
            <option value="CZECH_REPUBLIC">CZECH_REPUBLIC</option>
            <option value="DENMARK">DENMARK</option>
            <option value="DJIBOUTI">DJIBOUTI</option>
            <option value="DOMINICA">DOMINICA</option>
            <option value="DOMINICAN_REPUBLIC">DOMINICAN_REPUBLIC</option>
            <option value="EAST_TIMOR">EAST_TIMOR</option>
            <option value="ECUADOR">ECUADOR</option>
            <option value="EGYPT">EGYPT</option>
            <option value="EL_SALVADOR">EL_SALVADOR</option>
            <option value="EQUATORIAL_GUINEA">EQUATORIAL_GUINEA</option>
            <option value="ERITREA">ERITREA</option>
            <option value="ESTONIA">ESTONIA</option>
            <option value="ESWATINI">ESWATINI</option>
            <option value="ETHIOPIA">ETHIOPIA</option>
            <option value="FIJI">FIJI</option>
            <option value="FINLAND">FINLAND</option>
            <option value="FRANCE">FRANCE</option>
            <option value="GABON">GABON</option>
            <option value="THE_GAMBIA">THE_GAMBIA</option>
            <option value="GEORGIA">GEORGIA</option>
            <option value="GERMANY">GERMANY</option>
            <option value="GHANA">GHANA</option>
            <option value="GREECE">GREECE</option>
            <option value="GRENADA">GRENADA</option>
            <option value="GUATEMALA">GUATEMALA</option>
            <option value="GUINEA">GUINEA</option>
            <option value="GUINEA_BISSAU">GUINEA_BISSAU</option>
            <option value="GUYANA">GUYANA</option>
            <option value="HAITI">HAITI</option>
            <option value="HONDURAS">HONDURAS</option>
            <option value="HUNGARY">HUNGARY</option>
            <option value="ICELAND">ICELAND</option>
            <option value="INDIA">INDIA</option>
            <option value="INDONESIA">INDONESIA</option>
            <option value="IRAN">IRAN</option>
            <option value="IRAQ">IRAQ</option>
            <option value="IRELAND">IRELAND</option>
            <option value="ISRAEL">ISRAEL</option>
            <option value="ITALY">ITALY</option>
            <option value="JAMAICA">JAMAICA</option>
            <option value="JAPAN">JAPAN</option>
            <option value="JORDAN">JORDAN</option>
            <option value="KAZAKHSTAN">KAZAKHSTAN</option>
            <option value="KENYA">KENYA</option>
            <option value="KIRIBATI">KIRIBATI</option>
            <option value="NORTH_KOREA">NORTH_KOREA</option>
            <option value="SOUTH_KOREA">SOUTH_KOREA</option>
            <option value="KOSOVO">KOSOVO</option>
            <option value="KUWAIT">KUWAIT</option>
            <option value="KYRGYZSTAN">KYRGYZSTAN</option>
            <option value="LAOS">LAOS</option>
            <option value="LATVIA">LATVIA</option>
            <option value="LEBANON">LEBANON</option>
            <option value="LESOTHO">LESOTHO</option>
            <option value="LIBERIA">LIBERIA</option>
            <option value="LIBYA">LIBYA</option>
            <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
            <option value="LITHUANIA">LITHUANIA</option>
            <option value="LUXEMBOURG">LUXEMBOURG</option>
            <option value="MADAGASCAR">MADAGASCAR</option>
            <option value="MALAWI">MALAWI</option>
            <option value="MALAYSIA">MALAYSIA</option>
            <option value="MALDIVES">MALDIVES</option>
            <option value="MALI">MALI</option>
            <option value="MALTA">MALTA</option>
            <option value="MARSHALL_ISLANDS">MARSHALL_ISLANDS</option>
            <option value="MAURITANIA">MAURITANIA</option>
            <option value="MAURITIUS">MAURITIUS</option>
            <option value="MEXICO">MEXICO</option>
            <option value="FEDERATED_STATES_OF_MICRONESIA">FEDERATED_STATES_OF_MICRONESIA</option>
            <option value="MOLDOVA">MOLDOVA</option>
            <option value="MONACO">MONACO</option>
            <option value="MONGOLIA">MONGOLIA</option>
            <option value="MONTENEGRO">MONTENEGRO</option>
            <option value="MOROCCO">MOROCCO</option>
            <option value="MOZAMBIQUE">MOZAMBIQUE</option>
            <option value="MYANMAR_BURMA">MYANMAR_BURMA</option>
            <option value="NAMIBIA">NAMIBIA</option>
            <option value="NAURU">NAURU</option>
            <option value="NEPAL">NEPAL</option>
            <option value="NETHERLANDS">NETHERLANDS</option>
            <option value="NEW_ZEALAND">NEW_ZEALAND</option>
            <option value="NICARAGUA">NICARAGUA</option>
            <option value="NIGER">NIGER</option>
            <option value="NIGERIA">NIGERIA</option>
            <option value="NORTH_MACEDONIA">NORTH_MACEDONIA</option>
            <option value="NORWAY">NORWAY</option>
            <option value="OMAN">OMAN</option>
            <option value="PAKISTAN">PAKISTAN</option>
            <option value="PALAU">PALAU</option>
            <option value="PANAMA">PANAMA</option>
            <option value="PAPUA_NEW_GUINEA">PAPUA_NEW_GUINEA</option>
            <option value="PARAGUAY">PARAGUAY</option>
            <option value="PERU">PERU</option>
            <option value="PHILIPPINES">PHILIPPINES</option>
            <option value="POLAND">POLAND</option>
            <option value="PORTUGAL">PORTUGAL</option>
            <option value="QATAR">QATAR</option>
            <option value="ROMANIA">ROMANIA</option>
            <option value="RUSSIA">RUSSIA</option>
            <option value="RWANDA">RWANDA</option>
            <option value="SAINT_KITTS_AND_NEVIS">SAINT_KITTS_AND_NEVIS</option>
            <option value="SAINT_LUCIA">SAINT_LUCIA</option>
            <option value="SAINT_VINCENT_AND_THE_GRENADINES">SAINT_VINCENT_AND_THE_GRENADINES</option>
            <option value="SAMOA">SAMOA</option>
            <option value="SAN_MARINO">SAN_MARINO</option>
            <option value="SAO_TOME_AND_PRINCIPE">SAO_TOME_AND_PRINCIPE</option>
            <option value="SAUDI_ARABIA">SAUDI_ARABIA</option>
            <option value="SENEGAL">SENEGAL</option>
            <option value="SERBIA">SERBIA</option>
            <option value="SEYCHELLES">SEYCHELLES</option>
            <option value="SIERRA_LEONE">SIERRA_LEONE</option>
            <option value="SINGAPORE">SINGAPORE</option>
            <option value="SLOVAKIA">SLOVAKIA</option>
            <option value="SLOVENIA">SLOVENIA</option>
            <option value="SOLOMON_ISLANDS">SOLOMON_ISLANDS</option>
            <option value="SOMALIA">SOMALIA</option>
            <option value="SOUTH_AFRICA">SOUTH_AFRICA</option>
            <option value="SPAIN">SPAIN</option>
            <option value="SRI_LANKA">SRI_LANKA</option>
            <option value="SUDAN">SUDAN</option>
            <option value="SOUTH_SUDAN">SOUTH_SUDAN</option>
            <option value="SURINAME">SURINAME</option>
            <option value="SWEDEN">SWEDEN</option>
            <option value="SWITZERLAND">SWITZERLAND</option>
            <option value="SYRIA">SYRIA</option>
            <option value="TAIWAN">TAIWAN</option>
            <option value="TAJIKISTAN">TAJIKISTAN</option>
            <option value="TANZANIA">TANZANIA</option>
            <option value="THAILAND">THAILAND</option>
            <option value="TOGO">TOGO</option>
            <option value="TONGA">TONGA</option>
            <option value="TRINIDAD_AND_TOBAGO">TRINIDAD_AND_TOBAGO</option>
            <option value="TUNISIA">TUNISIA</option>
            <option value="TURKEY">TURKEY</option>
            <option value="TURKMENISTAN">TURKMENISTAN</option>
            <option value="TUVALU">TUVALU</option>
            <option value="UGANDA">UGANDA</option>
            <option value="UKRAINE">UKRAINE</option>
            <option value="UNITED_ARAB_EMIRATES">UNITED_ARAB_EMIRATES</option>
            <option value="UNITED_KINGDOM">UNITED_KINGDOM</option>
            <option value="UNITED_STATES">UNITED_STATES</option>
            <option value="URUGUAY">URUGUAY</option>
            <option value="UZBEKISTAN">UZBEKISTAN</option>
            <option value="VANUATU">VANUATU</option>
            <option value="VATICAN_CITY">VATICAN_CITY</option>
            <option value="VENEZUELA">VENEZUELA</option>
            <option value="VIETNAM">VIETNAM</option>
            <option value="YEMEN">YEMEN</option>
            <option value="ZAMBIA">ZAMBIA</option>
            <option value="ZIMBABWE">ZIMBABWE</option>
          </Field>
          <br/>
          
          {state.error ?
            <div className={styles.error}>{state.error}</div> : null}
          <button type="submit" className={styles.submit}>Send</button>
        </form>
        )}
        />
      </div>
    </div>
  );
}

export default UniversityForm;