import React, { useState } from "react";
import redux from 'seed/redux'
import cx from "classnames";
import { lcs } from 'components/util/Locales';
import { hasProfilePermission } from 'components/util/Permissions';

import c from "components/users/Profile.module.scss";

function Card(props) {
  const { profile: initialProfile, setUser, setProfile, userId, uploadFile } = props;

  const [editing, setEditing] = useState(false);
  const [profile, setProfileState] = useState({ ...initialProfile });

  const nor = (str) => {
    let res = str.toLowerCase().replace(/_/g, " ");
    return res.charAt(0).toUpperCase() + res.slice(1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);

    setUser(userId, {
      first_name: profile.user.first_name,
      last_name: profile.user.last_name,
      image_url: profile.user.image_url
    });

    setProfile(profile.id, {
      website: profile.website,
      industry: profile.industry,
      country: profile.country,
      gender: profile.gender,
      phone: profile.phone,
      linkedin: profile.linkedin,
      facebook: profile.facebook,
      twitter: profile.twitter,
      angel_list: profile.angel_list,
      github: profile.github
    });
  };

  const handleChange = (field, value, nested = false) => {
    setProfileState((prev) => {
      const updated = { ...prev };
      if (nested) {
        updated.user = { ...updated.user, [field]: value };
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const onProfileImageChange = (e) => {
    uploadFile(e.target.form, (res) => {
      if (!res.ok) return;
      setProfileState((prev) => ({
        ...prev,
        user: { ...prev.user, image_url: res.body.url },
      }));
    });
  };

  const onClickOpen = () => setEditing(true);
  const onClickCancel = () => setEditing(false);
  console.log(profile);
  
  const renderUserCard = () => (
    <div className={cx(c.card, c.mainCard)}>
      <div className={cx("card-body", "d-flex", "flex-column")}>
        <img className={cx(c.profileImageContainer)} src={profile.user.image_url} alt="user"/>
        <h5 className={cx(c.username)}>
          {`${profile.user.first_name} ${profile.user.last_name}`}
          {(!editing && hasProfilePermission(profile, "EDIT")) &&
            <button onClick={onClickOpen} className={cx(c.editLight)}>
              <i className="fas fa-edit fa-xs" />
            </button>
          }
        </h5>

        <div className={cx(c.cardSection, "card-text")}>
          <ul className={c.list}>
            {profile.website !== "" &&
              <li>
                <i className="fas fa-globe-americas" />
                {profile.website}
              </li>
            }
            {profile.industry !== "" &&
              <li>
                <i className="fas fa-industry" />
                {nor(profile.industry)}
              </li>
            }
            {profile.country !== "" &&
              <li>
                <i className="fas fa-map-marker-alt" />
                {nor(profile.country)}
              </li>
            }
            {profile.gender !== "" && (
              profile.gender === "FEMALE" ?
                <li>
                  <i className="fas fa-female" />
                  {lcs("female")}
                </li> :
                <li>
                  <i className="fas fa-male" />
                  {lcs("male")}
                </li>
            )}
            <li>
              <i className="fas fa-envelope" />
              <a href={`mailto:${profile.user.email}`}>
                {profile.user.email.length > 24 ? profile.user.email.substring(0, 24) + "…" : profile.user.email}
              </a>
            </li>
            {profile.phone !== "" &&
              <li>
                <i className="fas fa-phone" />
                {profile.phone}
              </li>
            }
          </ul>
        </div>

        <div className={cx("card-text")}>
          <ul className={c.list}>
            {profile.linkedin !== "" &&
              <li>
                <i className="fab fa-linkedin" />
                <p>{profile.linkedin}</p>
              </li>
            }
            {profile.angellist !== "" &&
              <li>
                <i className="fab fa-angellist" />
                <p>{profile.angel_list}</p>
              </li>
            }
            {profile.twitter !== "" &&
              <li>
                <i className="fab fa-twitter" />
                <p>{profile.twitter}</p>
              </li>
            }
            {profile.facebook !== "" &&
              <li>
                <i className="fab fa-facebook" />
                <p>{profile.facebook}</p>
              </li>
            }
            {profile.github !== "" &&
              <li>
                <i className="fab fa-github" />
                <p>{profile.github}</p>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );

  const renderUserCardForm = () => (
    <div className={cx(c.card)}>
      <form onSubmit={onSubmit}>
        <div className={cx("card-body", "d-flex", "flex-column")}>
          <img className={cx(c.profileImageContainer)} src={profile.user.image_url} alt="user"/>
          <h5 className={cx(c.username)}>{`${profile.user.first_name} ${profile.user.last_name}`}</h5>
          <div className={cx("card-text")}>
            <div className={cx("form-group")}>
              <label htmlFor="website">{lcs("first_name")}</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="website"
                value={profile.user.first_name}
                onChange={(e) => handleChange("first_name", e.target.value, true)}
              />
              <label htmlFor="website">{lcs("last_name")}</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="website"
                value={profile.user.last_name}
                onChange={(e) => handleChange("last_name", e.target.value, true)}
              />
              <label htmlFor="website">{lcs("profile_image")}</label>

              <form encType="multipart/form-data" style={{ padding: "0px" }}>
                <input
                  type="file"
                  className={cx("form-control", c.input, c.file)}
                  name="file"
                  onChange={onProfileImageChange}
                />
              </form>
            </div>
          </div>

          <div className={cx("card-text")}>
            <div className={cx("form-group")}>
              <label htmlFor="website">{lcs("website")}</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="website"
                value={profile.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
              <label htmlFor="industry">{lcs("industry")}</label>
              <select name="industry" onChange={(e) => handleChange("industry", e.target.value)} className={cx("form-control", c.input)} value={profile.industry} required>
                <option value=''>{lcs("select_an_option")}</option>
                <option value='AEROSPACE_INDUSTRY'>{nor("AEROSPACE_INDUSTRY")}</option>
                <option value='AGRICULTURE'>{nor("AGRICULTURE")}</option>
                <option value='ARTS_ENTERTAINMENT_RECREATION'>{nor("ARTS_ENTERTAINMENT_RECREATION")}</option>
                <option value='AUTOMOTIVE'>{nor("AUTOMOTIVE")}</option>
                <option value='CHEMICAL_PHARMACEUTICAL_INDUSTRIES'>{nor("CHEMICAL_PHARMACEUTICAL_INDUSTRIES")}</option>
                <option value='CLEAN_ENERGY'>{nor("CLEAN_ENERGY")}</option>
                <option value='CONSTRUCTION'>{nor("CONSTRUCTION")}</option>
                <option value='CONSULTING_PROFESSIONAL_AND_BUSINESS_SERVICES'>{nor("CONSULTING_PROFESSIONAL_AND_BUSINESS_SERVICES")}</option>
                <option value='DEFENSE_INDUSTRY'>{nor("DEFENSE_INDUSTRY")}</option>
                <option value='DESIGN'>{nor("DESIGN")}</option>
                <option value='ECOMMERCE'>{nor("ECOMMERCE")}</option>
                <option value='EDUCATION'>{nor("EDUCATION")}</option>
                <option value='ENERGY_INDUSTRY'>{nor("ENERGY_INDUSTRY")}</option>
                <option value='FASHION'>{nor("FASHION")}</option>
                <option value='FINANCIAL_SERVICES_INSURANCE_CREDIT_FUNDS'>{nor("FINANCIAL_SERVICES_INSURANCE_CREDIT_FUNDS")}</option>
                <option value='FOOD_DRINK'>{nor("FOOD_DRINK")}</option>
                <option value='HEALTH_AND_WELLNESS_HEALTHCARE'>{nor("HEALTH_AND_WELLNESS_HEALTHCARE")}</option>
                <option value='INFORMATION_TECHNOLOGY'>{nor("INFORMATION_TECHNOLOGY")}</option>
                <option value='INTERNET_OF_THINGS'>{nor("INTERNET_OF_THINGS")}</option>
                <option value='LEGAL'>{nor("LEGAL")}</option>
                <option value='LIFE_SCIENCES'>{nor("LIFE_SCIENCES")}</option>
                <option value='LOGISTICS'>{nor("LOGISTICS")}</option>
                <option value='MANUFACTURING'>{nor("MANUFACTURING")}</option>
                <option value='MEDIA'>{nor("MEDIA")}</option>
                <option value='MINING'>{nor("MINING")}</option>
                <option value='MOBILE_APPLICATION'>{nor("MOBILE_APPLICATION")}</option>
                <option value='PUBLIC_SERVICE'>{nor("PUBLIC_SERVICE")}</option>
                <option value='REAL_ESTATE'>{nor("REAL_ESTATE")}</option>
                <option value='RETAIL'>{nor("RETAIL")}</option>
                <option value='SCIENTIFIC_AND_TECHNICAL_SERVICES'>{nor("SCIENTIFIC_AND_TECHNICAL_SERVICES")}</option>
                <option value='SPORTS'>{nor("SPORTS")}</option>
                <option value='STEEL_INDUSTRY'>{nor("STEEL_INDUSTRY")}</option>
                <option value='TELECOMMUNICATIONS_SERVICES'>{nor("TELECOMMUNICATIONS_SERVICES")}</option>
                <option value='TEXTILES'>{nor("TEXTILES")}</option>
                <option value='TOURISM'>{nor("TOURISM")}</option>
                <option value='TRANSPORT'>{nor("TRANSPORT")}</option>
                <option value='OTHER'>{nor("OTHER")}</option>
              </select>

              <label htmlFor="location">{lcs("location")}</label>
              <select name="industry" onChange={(e) => handleChange("country", e.target.value)} className={cx("form-control", c.input)} value={profile.country} required>
                <option value="">{lcs("select_an_option")}</option>
                <option value='AFGHANISTAN'>{nor("AFGHANISTAN")}</option>
                <option value='ALBANIA'>{nor("ALBANIA")}</option>
                <option value='ALGERIA'>{nor("ALGERIA")}</option>
                <option value='ANDORRA'>{nor("ANDORRA")}</option>
                <option value='ANGOLA'>{nor("ANGOLA")}</option>
                <option value='ANTIGUA_AND_BARBUDA'>{nor("ANTIGUA_AND_BARBUDA")}</option>
                <option value='ARGENTINA'>{nor("ARGENTINA")}</option>
                <option value='ARMENIA'>{nor("ARMENIA")}</option>
                <option value='AUSTRALIA'>{nor("AUSTRALIA")}</option>
                <option value='AUSTRIA'>{nor("AUSTRIA")}</option>
                <option value='AZERBAIJAN'>{nor("AZERBAIJAN")}</option>
                <option value='THE_BAHAMAS'>{nor("THE_BAHAMAS")}</option>
                <option value='BAHRAIN'>{nor("BAHRAIN")}</option>
                <option value='BANGLADESH'>{nor("BANGLADESH")}</option>
                <option value='BARBADOS'>{nor("BARBADOS")}</option>
                <option value='BELARUS'>{nor("BELARUS")}</option>
                <option value='BELGIUM'>{nor("BELGIUM")}</option>
                <option value='BELIZE'>{nor("BELIZE")}</option>
                <option value='BENIN'>{nor("BENIN")}</option>
                <option value='BHUTAN'>{nor("BHUTAN")}</option>
                <option value='BOLIVIA'>{nor("BOLIVIA")}</option>
                <option value='BOSNIA_AND_HERZEGOVINA'>{nor("BOSNIA_AND_HERZEGOVINA")}</option>
                <option value='BOTSWANA'>{nor("BOTSWANA")}</option>
                <option value='BRAZIL'>{nor("BRAZIL")}</option>
                <option value='BRUNEI'>{nor("BRUNEI")}</option>
                <option value='BULGARIA'>{nor("BULGARIA")}</option>
                <option value='BURKINA_FASO'>{nor("BURKINA_FASO")}</option>
                <option value='BURUNDI'>{nor("BURUNDI")}</option>
                <option value='CABO_VERDE'>{nor("CABO_VERDE")}</option>
                <option value='CAMBODIA'>{nor("CAMBODIA")}</option>
                <option value='CAMEROON'>{nor("CAMEROON")}</option>
                <option value='CANADA'>{nor("CANADA")}</option>
                <option value='CENTRAL_AFRICAN_REPUBLIC'>{nor("CENTRAL_AFRICAN_REPUBLIC")}</option>
                <option value='CHAD'>{nor("CHAD")}</option>
                <option value='CHILE'>{nor("CHILE")}</option>
                <option value='CHINA'>{nor("CHINA")}</option>
                <option value='COLOMBIA'>{nor("COLOMBIA")}</option>
                <option value='COMOROS'>{nor("COMOROS")}</option>
                <option value='DEMOCRATIC_REPUBLIC_OF_THE_CONGO'>{nor("DEMOCRATIC_REPUBLIC_OF_THE_CONGO")}</option>
                <option value='REPUBLIC_OF_THE_CONGO'>{nor("REPUBLIC_OF_THE_CONGO")}</option>
                <option value='COSTA_RICA'>{nor("COSTA_RICA")}</option>
                <option value='COTE_DIVOIRE'>{nor("COTE_DIVOIRE")}</option>
                <option value='CROATIA'>{nor("CROATIA")}</option>
                <option value='CUBA'>{nor("CUBA")}</option>
                <option value='CYPRUS'>{nor("CYPRUS")}</option>
                <option value='CZECH_REPUBLIC'>{nor("CZECH_REPUBLIC")}</option>
                <option value='DENMARK'>{nor("DENMARK")}</option>
                <option value='DJIBOUTI'>{nor("DJIBOUTI")}</option>
                <option value='DOMINICA'>{nor("DOMINICA")}</option>
                <option value='DOMINICAN_REPUBLIC'>{nor("DOMINICAN_REPUBLIC")}</option>
                <option value='EAST_TIMOR'>{nor("EAST_TIMOR")}</option>
                <option value='ECUADOR'>{nor("ECUADOR")}</option>
                <option value='EGYPT'>{nor("EGYPT")}</option>
                <option value='EL_SALVADOR'>{nor("EL_SALVADOR")}</option>
                <option value='EQUATORIAL_GUINEA'>{nor("EQUATORIAL_GUINEA")}</option>
                <option value='ERITREA'>{nor("ERITREA")}</option>
                <option value='ESTONIA'>{nor("ESTONIA")}</option>
                <option value='ESWATINI'>{nor("ESWATINI")}</option>
                <option value='ETHIOPIA'>{nor("ETHIOPIA")}</option>
                <option value='FIJI'>{nor("FIJI")}</option>
                <option value='FINLAND'>{nor("FINLAND")}</option>
                <option value='FRANCE'>{nor("FRANCE")}</option>
                <option value='GABON'>{nor("GABON")}</option>
                <option value='THE_GAMBIA'>{nor("THE_GAMBIA")}</option>
                <option value='GEORGIA'>{nor("GEORGIA")}</option>
                <option value='GERMANY'>{nor("GERMANY")}</option>
                <option value='GHANA'>{nor("GHANA")}</option>
                <option value='GREECE'>{nor("GREECE")}</option>
                <option value='GRENADA'>{nor("GRENADA")}</option>
                <option value='GUATEMALA'>{nor("GUATEMALA")}</option>
                <option value='GUINEA'>{nor("GUINEA")}</option>
                <option value='GUINEA_BISSAU'>{nor("GUINEA_BISSAU")}</option>
                <option value='GUYANA'>{nor("GUYANA")}</option>
                <option value='HAITI'>{nor("HAITI")}</option>
                <option value='HONDURAS'>{nor("HONDURAS")}</option>
                <option value='HUNGARY'>{nor("HUNGARY")}</option>
                <option value='ICELAND'>{nor("ICELAND")}</option>
                <option value='INDIA'>{nor("INDIA")}</option>
                <option value='INDONESIA'>{nor("INDONESIA")}</option>
                <option value='IRAN'>{nor("IRAN")}</option>
                <option value='IRAQ'>{nor("IRAQ")}</option>
                <option value='IRELAND'>{nor("IRELAND")}</option>
                <option value='ISRAEL'>{nor("ISRAEL")}</option>
                <option value='ITALY'>{nor("ITALY")}</option>
                <option value='JAMAICA'>{nor("JAMAICA")}</option>
                <option value='JAPAN'>{nor("JAPAN")}</option>
                <option value='JORDAN'>{nor("JORDAN")}</option>
                <option value='KAZAKHSTAN'>{nor("KAZAKHSTAN")}</option>
                <option value='KENYA'>{nor("KENYA")}</option>
                <option value='KIRIBATI'>{nor("KIRIBATI")}</option>
                <option value='NORTH_KOREA'>{nor("NORTH_KOREA")}</option>
                <option value='SOUTH_KOREA'>{nor("SOUTH_KOREA")}</option>
                <option value='KOSOVO'>{nor("KOSOVO")}</option>
                <option value='KUWAIT'>{nor("KUWAIT")}</option>
                <option value='KYRGYZSTAN'>{nor("KYRGYZSTAN")}</option>
                <option value='LAOS'>{nor("LAOS")}</option>
                <option value='LATVIA'>{nor("LATVIA")}</option>
                <option value='LEBANON'>{nor("LEBANON")}</option>
                <option value='LESOTHO'>{nor("LESOTHO")}</option>
                <option value='LIBERIA'>{nor("LIBERIA")}</option>
                <option value='LIBYA'>{nor("LIBYA")}</option>
                <option value='LIECHTENSTEIN'>{nor("LIECHTENSTEIN")}</option>
                <option value='LITHUANIA'>{nor("LITHUANIA")}</option>
                <option value='LUXEMBOURG'>{nor("LUXEMBOURG")}</option>
                <option value='MADAGASCAR'>{nor("MADAGASCAR")}</option>
                <option value='MALAWI'>{nor("MALAWI")}</option>
                <option value='MALAYSIA'>{nor("MALAYSIA")}</option>
                <option value='MALDIVES'>{nor("MALDIVES")}</option>
                <option value='MALI'>{nor("MALI")}</option>
                <option value='MALTA'>{nor("MALTA")}</option>
                <option value='MARSHALL_ISLANDS'>{nor("MARSHALL_ISLANDS")}</option>
                <option value='MAURITANIA'>{nor("MAURITANIA")}</option>
                <option value='MAURITIUS'>{nor("MAURITIUS")}</option>
                <option value='MEXICO'>{nor("MEXICO")}</option>
                <option value='FEDERATED_STATES_OF_MICRONESIA'>{nor("FEDERATED_STATES_OF_MICRONESIA")}</option>
                <option value='MOLDOVA'>{nor("MOLDOVA")}</option>
                <option value='MONACO'>{nor("MONACO")}</option>
                <option value='MONGOLIA'>{nor("MONGOLIA")}</option>
                <option value='MONTENEGRO'>{nor("MONTENEGRO")}</option>
                <option value='MOROCCO'>{nor("MOROCCO")}</option>
                <option value='MOZAMBIQUE'>{nor("MOZAMBIQUE")}</option>
                <option value='MYANMAR_BURMA'>{nor("MYANMAR_BURMA")}</option>
                <option value='NAMIBIA'>{nor("NAMIBIA")}</option>
                <option value='NAURU'>{nor("NAURU")}</option>
                <option value='NEPAL'>{nor("NEPAL")}</option>
                <option value='NETHERLANDS'>{nor("NETHERLANDS")}</option>
                <option value='NEW_ZEALAND'>{nor("NEW_ZEALAND")}</option>
                <option value='NICARAGUA'>{nor("NICARAGUA")}</option>
                <option value='NIGER'>{nor("NIGER")}</option>
                <option value='NIGERIA'>{nor("NIGERIA")}</option>
                <option value='NORTH_MACEDONIA'>{nor("NORTH_MACEDONIA")}</option>
                <option value='NORWAY'>{nor("NORWAY")}</option>
                <option value='OMAN'>{nor("OMAN")}</option>
                <option value='PAKISTAN'>{nor("PAKISTAN")}</option>
                <option value='PALAU'>{nor("PALAU")}</option>
                <option value='PANAMA'>{nor("PANAMA")}</option>
                <option value='PAPUA_NEW_GUINEA'>{nor("PAPUA_NEW_GUINEA")}</option>
                <option value='PARAGUAY'>{nor("PARAGUAY")}</option>
                <option value='PERU'>{nor("PERU")}</option>
                <option value='PHILIPPINES'>{nor("PHILIPPINES")}</option>
                <option value='POLAND'>{nor("POLAND")}</option>
                <option value='PORTUGAL'>{nor("PORTUGAL")}</option>
                <option value='QATAR'>{nor("QATAR")}</option>
                <option value='ROMANIA'>{nor("ROMANIA")}</option>
                <option value='RUSSIA'>{nor("RUSSIA")}</option>
                <option value='RWANDA'>{nor("RWANDA")}</option>
                <option value='SAINT_KITTS_AND_NEVIS'>{nor("SAINT_KITTS_AND_NEVIS")}</option>
                <option value='SAINT_LUCIA'>{nor("SAINT_LUCIA")}</option>
                <option value='SAINT_VINCENT_AND_THE_GRENADINES'>{nor("SAINT_VINCENT_AND_THE_GRENADINES")}</option>
                <option value='SAMOA'>{nor("SAMOA")}</option>
                <option value='SAN_MARINO'>{nor("SAN_MARINO")}</option>
                <option value='SAO_TOME_AND_PRINCIPE'>{nor("SAO_TOME_AND_PRINCIPE")}</option>
                <option value='SAUDI_ARABIA'>{nor("SAUDI_ARABIA")}</option>
                <option value='SENEGAL'>{nor("SENEGAL")}</option>
                <option value='SERBIA'>{nor("SERBIA")}</option>
                <option value='SEYCHELLES'>{nor("SEYCHELLES")}</option>
                <option value='SIERRA_LEONE'>{nor("SIERRA_LEONE")}</option>
                <option value='SINGAPORE'>{nor("SINGAPORE")}</option>
                <option value='SLOVAKIA'>{nor("SLOVAKIA")}</option>
                <option value='SLOVENIA'>{nor("SLOVENIA")}</option>
                <option value='SOLOMON_ISLANDS'>{nor("SOLOMON_ISLANDS")}</option>
                <option value='SOMALIA'>{nor("SOMALIA")}</option>
                <option value='SOUTH_AFRICA'>{nor("SOUTH_AFRICA")}</option>
                <option value='SPAIN'>{nor("SPAIN")}</option>
                <option value='SRI_LANKA'>{nor("SRI_LANKA")}</option>
                <option value='SUDAN'>{nor("SUDAN")}</option>
                <option value='SOUTH_SUDAN'>{nor("SOUTH_SUDAN")}</option>
                <option value='SURINAME'>{nor("SURINAME")}</option>
                <option value='SWEDEN'>{nor("SWEDEN")}</option>
                <option value='SWITZERLAND'>{nor("SWITZERLAND")}</option>
                <option value='SYRIA'>{nor("SYRIA")}</option>
                <option value='TAIWAN'>{nor("TAIWAN")}</option>
                <option value='TAJIKISTAN'>{nor("TAJIKISTAN")}</option>
                <option value='TANZANIA'>{nor("TANZANIA")}</option>
                <option value='THAILAND'>{nor("THAILAND")}</option>
                <option value='TOGO'>{nor("TOGO")}</option>
                <option value='TONGA'>{nor("TONGA")}</option>
                <option value='TRINIDAD_AND_TOBAGO'>{nor("TRINIDAD_AND_TOBAGO")}</option>
                <option value='TUNISIA'>{nor("TUNISIA")}</option>
                <option value='TURKEY'>{nor("TURKEY")}</option>
                <option value='TURKMENISTAN'>{nor("TURKMENISTAN")}</option>
                <option value='TUVALU'>{nor("TUVALU")}</option>
                <option value='UGANDA'>{nor("UGANDA")}</option>
                <option value='UKRAINE'>{nor("UKRAINE")}</option>
                <option value='UNITED_ARAB_EMIRATES'>{nor("UNITED_ARAB_EMIRATES")}</option>
                <option value='UNITED_KINGDOM'>{nor("UNITED_KINGDOM")}</option>
                <option value='UNITED_STATES'>{nor("UNITED_STATES")}</option>
                <option value='URUGUAY'>{nor("URUGUAY")}</option>
                <option value='UZBEKISTAN'>{nor("UZBEKISTAN")}</option>
                <option value='VANUATU'>{nor("VANUATU")}</option>
                <option value='VATICAN_CITY'>{nor("VATICAN_CITY")}</option>
                <option value='VENEZUELA'>{nor("VENEZUELA")}</option>
                <option value='VIETNAM'>{nor("VIETNAM")}</option>
                <option value='YEMEN'>{nor("YEMEN")}</option>
                <option value='ZAMBIA'>{nor("ZAMBIA")}</option>
                <option value='ZIMBABWE'>{nor("ZIMBABWE")}</option>
              </select>
              <label htmlFor="gender">{lcs("gender")}</label> 
              <select name="gender" onChange={(e) => handleChange("gender", e.target.value)} className={cx("form-control", c.input)} value={profile.gender}>
                <option value="">{lcs("select_an_option")}</option>
                <option value='MALE'>{lcs("male")}</option>
                <option value='FEMALE'>{lcs("female")}</option>
              </select>
              <label htmlFor="industry">{lcs("phone")}</label>
              <input
                type="tel"
                className={cx("form-control", c.input)}
                name="phone"
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className={cx("card-text")}>
            <div className={cx("form-group")}>
              <label htmlFor="website">LinkedIn</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="linkedin"
                value={profile.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
              />
              <label htmlFor="industry">Angellist</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="angelist"
                value={profile.angel_list}
                onChange={(e) => handleChange("angel_list", e.target.value)}
              />
              <label htmlFor="industry">Facebook</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="facebook"
                value={profile.facebook}
                onChange={(e) => handleChange("facebook", e.target.value)}
              />
              <label htmlFor="location1">Twitter</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="twitter"
                value={profile.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
              />
              <label htmlFor="location1">Github</label>
              <input
                type="text"
                className={cx("form-control", c.input)}
                name="github"
                value={profile.github}
                onChange={(e) => handleChange("github", e.target.value)}
              />
            </div>
          </div>
          <div className={cx(c.btnContainer)}>
            <button type="submit" className={cx("btn", c.buttonGreen)}>
              {lcs("save_changes")}
            </button>
            <button type="button" className={cx("btn", "btn-light")} onClick={onClickCancel}>
              {lcs("cancel")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return <>{!editing ? renderUserCard() : renderUserCardForm()}</>;
}

export default redux(Card);