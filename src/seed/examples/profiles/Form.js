import React, {useState} from "react";
import cx from "classnames";
import { useSave, useSet, useQuery, useDetail } from "seed/gql";
import * as queries from "seed/gql/queries";
import { Formik, Field } from "formik";
import MultiField from "seed/components/helpers/MultiField";
import FileField from "seed/components/helpers/FileField";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profiles/Form.module.css";

const USERS  = `
{
  users { }
}
`;

function ProfileForm(props) {

  const [state, setState] = useState({});
  const { url } = props.match;
  const { profile_id }  = props.match.params;
  const editMode = profile_id != null;

  const saveOptions = {
    onCompleted: (data) => {
      const backUrl = url.substring(0, url.lastIndexOf("/"));
      props.history.push(backUrl);
    },
    onError: (error) => setState({ error: "An error has occurred, try again" })
  };

  const [callSave, qSave] = useSave(queries.SAVE_PROFILE, saveOptions);
  const [callSet, qSet] = useSet(queries.SET_PROFILE, saveOptions);

  const qProfile = useDetail(queries.PROFILE, profile_id);
  const qUsers = useQuery(USERS);

  if (editMode && qProfile.loading) return <Loading />;
  if (editMode && qProfile.error) return "Error";

  const onSubmit = (values) => {
    values.id = profile_id;
    if (editMode) callSet(values);
    else callSave(values);
  };

  const { profile = {} } = qProfile.data;
  const { users = [] } = qUsers.data;

  return (
    <div className={styles.module}>
      <div className={styles.header}>Profile</div>
      <div className={styles.form}>
        <Formik
           initialValues={profile}
           onSubmit={onSubmit}
           render={(f) => (

        <form onSubmit={f.handleSubmit}>
          
          <label className={styles.lbl}>Phone</label><br/>
          <Field type="text" name="phone"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Gender</label>
          <Field component="select" name="gender.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Age</label><br/>
          <Field type="number" name="age"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Bio</label><br/>
          <Field type="text" name="bio"
            component="textarea" rows="3"
            className={styles.txa} />
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
          
          <label className={styles.lbl}>State</label>
          <Field component="select" name="state.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="ALABAMA">ALABAMA</option>
            <option value="ALASKA">ALASKA</option>
            <option value="ARIZONA">ARIZONA</option>
            <option value="ARKANSAS">ARKANSAS</option>
            <option value="CALIFORNIA">CALIFORNIA</option>
            <option value="COLORADO">COLORADO</option>
            <option value="CONNECTICUT">CONNECTICUT</option>
            <option value="DELAWARE">DELAWARE</option>
            <option value="FLORIDA">FLORIDA</option>
            <option value="GEORGIA">GEORGIA</option>
            <option value="HAWAII">HAWAII</option>
            <option value="IDAHO">IDAHO</option>
            <option value="ILLINOIS">ILLINOIS</option>
            <option value="INDIANA">INDIANA</option>
            <option value="IOWA">IOWA</option>
            <option value="KANSAS">KANSAS</option>
            <option value="KENTUCKY">KENTUCKY</option>
            <option value="LOUISIANA">LOUISIANA</option>
            <option value="MAINE">MAINE</option>
            <option value="MARYLAND">MARYLAND</option>
            <option value="MASSACHUSETTS">MASSACHUSETTS</option>
            <option value="MICHIGAN">MICHIGAN</option>
            <option value="MINNESOTA">MINNESOTA</option>
            <option value="MISSISSIPPI">MISSISSIPPI</option>
            <option value="MISSOURI">MISSOURI</option>
            <option value="MONTANA">MONTANA</option>
            <option value="NEBRASKA">NEBRASKA</option>
            <option value="NEVADA">NEVADA</option>
            <option value="NEW_HAMPSHIRE">NEW_HAMPSHIRE</option>
            <option value="NEW_JERSEY">NEW_JERSEY</option>
            <option value="NEW_MEXICO">NEW_MEXICO</option>
            <option value="NEW_YORK">NEW_YORK</option>
            <option value="NORTH_CAROLINA">NORTH_CAROLINA</option>
            <option value="NORTH_DAKOTA">NORTH_DAKOTA</option>
            <option value="OHIO">OHIO</option>
            <option value="OKLAHOMA">OKLAHOMA</option>
            <option value="OREGON">OREGON</option>
            <option value="PENNSYLVANIA">PENNSYLVANIA</option>
            <option value="RHODE_ISLAND">RHODE_ISLAND</option>
            <option value="SOUTH_CAROLINA">SOUTH_CAROLINA</option>
            <option value="SOUTH_DAKOTA">SOUTH_DAKOTA</option>
            <option value="TENNESSEE">TENNESSEE</option>
            <option value="TEXAS">TEXAS</option>
            <option value="UTAH">UTAH</option>
            <option value="VERMONT">VERMONT</option>
            <option value="VIRGINIA">VIRGINIA</option>
            <option value="WASHINGTON">WASHINGTON</option>
            <option value="WEST_VIRGINIA">WEST_VIRGINIA</option>
            <option value="WISCONSIN">WISCONSIN</option>
            <option value="WYOMINGAGUASCALIENTES">WYOMINGAGUASCALIENTES</option>
            <option value="BAJA_CALIFORNIA">BAJA_CALIFORNIA</option>
            <option value="BAJA_CALIFORNIA_SUR">BAJA_CALIFORNIA_SUR</option>
            <option value="CAMPECHE">CAMPECHE</option>
            <option value="CIUDAD_DE_MEXICO">CIUDAD_DE_MEXICO</option>
            <option value="CHIAPAS">CHIAPAS</option>
            <option value="CHIHUAHUA">CHIHUAHUA</option>
            <option value="COAHUILA">COAHUILA</option>
            <option value="COLIMA">COLIMA</option>
            <option value="DURANGO">DURANGO</option>
            <option value="ESTADO_DE_MEXICO">ESTADO_DE_MEXICO</option>
            <option value="GUANAJUATO">GUANAJUATO</option>
            <option value="GUERRERO">GUERRERO</option>
            <option value="HIDALGO">HIDALGO</option>
            <option value="JALISCO">JALISCO</option>
            <option value="MICHOACAN">MICHOACAN</option>
            <option value="MORELOS">MORELOS</option>
            <option value="NAYARIT">NAYARIT</option>
            <option value="NUEVO_LEON">NUEVO_LEON</option>
            <option value="OAXACA">OAXACA</option>
            <option value="PUEBLA">PUEBLA</option>
            <option value="QUERETARO">QUERETARO</option>
            <option value="QUINTANA_ROO">QUINTANA_ROO</option>
            <option value="SAN_LUIS_POTOSI">SAN_LUIS_POTOSI</option>
            <option value="SINALOA">SINALOA</option>
            <option value="SONORA">SONORA</option>
            <option value="TABASCO">TABASCO</option>
            <option value="TAMAULIPAS">TAMAULIPAS</option>
            <option value="TLAXCALA">TLAXCALA</option>
            <option value="VERACRUZ">VERACRUZ</option>
            <option value="YUCATAN">YUCATAN</option>
            <option value="ZACATECAS">ZACATECAS</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Industry</label>
          <Field component="select" name="industry.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="AEROSPACE_INDUSTRY">AEROSPACE_INDUSTRY</option>
            <option value="AGRICULTURE">AGRICULTURE</option>
            <option value="ARTS_ENTERTAINMENT_RECREATION">ARTS_ENTERTAINMENT_RECREATION</option>
            <option value="AUTOMOTIVE">AUTOMOTIVE</option>
            <option value="CHEMICAL_PHARMACEUTICAL_INDUSTRIES">CHEMICAL_PHARMACEUTICAL_INDUSTRIES</option>
            <option value="CLEAN_ENERGY">CLEAN_ENERGY</option>
            <option value="CONSTRUCTION">CONSTRUCTION</option>
            <option value="CONSULTING_PROFESSIONAL_AND_BUSINESS_SERVICES">CONSULTING_PROFESSIONAL_AND_BUSINESS_SERVICES</option>
            <option value="DEFENSE_INDUSTRY">DEFENSE_INDUSTRY</option>
            <option value="DESIGN">DESIGN</option>
            <option value="ECOMMERCE">ECOMMERCE</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="ENERGY_INDUSTRY">ENERGY_INDUSTRY</option>
            <option value="FASHION">FASHION</option>
            <option value="FINANCIAL_SERVICES_INSURANCE_CREDIT_FUNDS">FINANCIAL_SERVICES_INSURANCE_CREDIT_FUNDS</option>
            <option value="FOOD_DRINK">FOOD_DRINK</option>
            <option value="HEALTH_AND_WELLNESS_HEALTHCARE">HEALTH_AND_WELLNESS_HEALTHCARE</option>
            <option value="INFORMATION_TECHNOLOGY">INFORMATION_TECHNOLOGY</option>
            <option value="INTERNET_OF_THINGS">INTERNET_OF_THINGS</option>
            <option value="LEGAL">LEGAL</option>
            <option value="LIFE_SCIENCES">LIFE_SCIENCES</option>
            <option value="LOGISTICS">LOGISTICS</option>
            <option value="MANUFACTURING">MANUFACTURING</option>
            <option value="MEDIA">MEDIA</option>
            <option value="MINING">MINING</option>
            <option value="MOBILE_APPLICATION">MOBILE_APPLICATION</option>
            <option value="PUBLIC_SERVICE">PUBLIC_SERVICE</option>
            <option value="REAL_ESTATE">REAL_ESTATE</option>
            <option value="RETAIL">RETAIL</option>
            <option value="SCIENTIFIC_AND_TECHNICAL_SERVICES">SCIENTIFIC_AND_TECHNICAL_SERVICES</option>
            <option value="SPORTS">SPORTS</option>
            <option value="STEEL_INDUSTRY">STEEL_INDUSTRY</option>
            <option value="TELECOMMUNICATIONS_SERVICES">TELECOMMUNICATIONS_SERVICES</option>
            <option value="TEXTILES">TEXTILES</option>
            <option value="TOURISM">TOURISM</option>
            <option value="TRANSPORT">TRANSPORT</option>
            <option value="OTHER">OTHER</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Preferred lang</label><br/>
          <Field type="text" name="preferredLang"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Website</label><br/>
          <Field type="text" name="website"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Linkedin</label><br/>
          <Field type="text" name="linkedin"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Github</label><br/>
          <Field type="text" name="github"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Facebook</label><br/>
          <Field type="text" name="facebook"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Twitter</label><br/>
          <Field type="text" name="twitter"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Angel list</label><br/>
          <Field type="text" name="angelList"
            className={styles.txt} />
          <br/>
          
          <label className={styles.lbl}>Made</label><br/>
          <Field type="text" name="made"
            component="textarea" rows="3"
            className={styles.txa} />
          <br/>
          
          <label className={styles.lbl}>Phone visibility</label>
          <Field component="select" name="phoneVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Gender visibility</label>
          <Field component="select" name="genderVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Age visibility</label>
          <Field component="select" name="ageVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Bio visibility</label>
          <Field component="select" name="bioVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Country visibility</label>
          <Field component="select" name="countryVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>State visibility</label>
          <Field component="select" name="stateVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Industry visibility</label>
          <Field component="select" name="industryVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Website visibility</label>
          <Field component="select" name="websiteVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Linkedin visibility</label>
          <Field component="select" name="linkedinVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Github visibility</label>
          <Field component="select" name="githubVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Facebook visibility</label>
          <Field component="select" name="facebookVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Twitter visibility</label>
          <Field component="select" name="twitterVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Angel list visibility</label>
          <Field component="select" name="angelListVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Made visibility</label>
          <Field component="select" name="madeVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Educations visibility</label>
          <Field component="select" name="educationsVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Laborals visibility</label>
          <Field component="select" name="laboralsVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Languages visibility</label>
          <Field component="select" name="languagesVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Primary skills visibility</label>
          <Field component="select" name="primarySkillsVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <label className={styles.lbl}>Secondary skills visibility</label>
          <Field component="select" name="secondarySkillsVisibility.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </Field>
          <br/>
          
          <div>
          <label className={styles.lbl}>User</label>
          <Field component="select" name="user.id"
            className={styles.ops} >
            <option value="">Select an option</option>
            { users.map((e, idx) => <option value={e.id}>{e.id}</option>) }
          </Field>
          <br/>
          </div>
          
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

export default ProfileForm;