import React, { useState } from 'react';
import cx from 'classnames';
import { hasProjectPermission } from 'components/util/Permissions';
import { getBrText } from 'components/util/Format'
import { lcs } from 'components/util/Locales'

import c from 'components/projects/Profile.module.scss';
import c2 from 'components/projects/Header.module.scss';

function ProjectHeader(props) {
  const {
    projectDetails: projectDetailsProp = {},
    project,
    setProject,
    setProjectDetail,
  } = props;

  const [editing, setEditing] = useState(false);
  const [projectDetails, setProjectDetails] = useState({...projectDetailsProp});

  const nor = (str) => {
    let res = str.toLowerCase().replace(/_/g, " ");
    return res.charAt(0).toUpperCase() + res.slice(1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditing(false);

    const proj = projectDetails.project;
    const projectBody = {
      name: proj.name,
      description: proj.description,
    };
    setProject(proj.id, projectBody);

    const detailsBody = {
      website: projectDetails.website,
      industry: projectDetails.industry,
      country: projectDetails.country,
      visibility: projectDetails.visibility,
    };
    setProjectDetail(projectDetails.id, detailsBody);
  };

  const onFieldChange = (field, subfield) => (e) => {
    const value = e.target.value;

    setProjectDetails((prev) => {
      const updated = { ...prev };
      if (subfield) {
        updated[subfield][field] = value;
      } else {
        updated[field] = value;
      }
      return updated;
    });
  };

  const onClickOpen = () => setEditing(true);
  const onClickCancel = () => setEditing(false);

  const renderCard = () => {
    return (
      <div className={cx(c.card, c2.header)}>
        <div className={cx("card-body")}>
          <h1 className={cx(c.cardTitle)}>
            {project.name}
            {hasProjectPermission(project, ["MEMBER"]) &&
              <button onClick={onClickOpen} className={cx(c2.editLight)}>
                <i className="fas fa-edit fa-xs" />
              </button>
            }
          </h1>
          <div style={{display: 'inline-flex', gap: '8px'}}>
            <div className={cx(c2.badgeEdit)}>{lcs("member")}</div>
            <div className={cx(c2.badgeEdit)}>
              <i className={cx("fas", "fa-xs", "fa-industry")} />
              {` ${nor(projectDetails.industry)}`}
            </div>
          </div>
          <div>{getBrText(project.description)}</div>

          <ul className={cx('d-flex', 'flex-column', c2.projectInfoList)}>
            <li>
              <i className="fas fa-globe-americas" />
              <b>
                {`${lcs("website")}: `}
                <a target='blank' href={projectDetails.website}>{projectDetails.website}</a>
              </b>
            </li>
            <li>
              <i className="fas fa-industry" />
              <b>
                {`${lcs("industry")}: ${nor(projectDetails.industry)}`}
              </b>
            </li>
            <li>
              <i className="fas fa-map-marker-alt" />
              <b>
                {`${lcs("location")}: ${nor(projectDetails.country)}`}
              </b>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    const { project } = projectDetails;

    return (
      <div className={cx(c.card)}>
        <div className={cx("card-body")}>
          <form onSubmit={onSubmit}>
            <div>
              <p>{lcs("project_name")}</p>
              <input type="text" className={cx("form-control", c2.input)} name="projectName" value={project.name} onChange={onFieldChange("name", "project")} required />

              <p>{lcs("description")}</p>
              <textarea className={cx("form-control", c2.input)} style={{ minHeight: '80px', maxHeight: '120px' }} name="description" value={project.description} onChange={onFieldChange("description", "project")} rows="3" />

              <p>{lcs("website")}</p>
              <input type="text" className={cx("form-control", c2.input)} name="website" value={projectDetails.website} onChange={onFieldChange("website")} />

              <p>{lcs("industry")}</p>
              <select name="industry" onChange={onFieldChange("industry")} className={cx("form-control", c2.input)} value={projectDetails.industry} required>
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

              <p>{lcs("location")}</p>
              <select name="country" onChange={onFieldChange("country")} className={cx("form-control", c2.input)} value={projectDetails.country} required>
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
            </div>
            <div className={cx(c.btnContainer)}>
              <button type="submit" className={cx("btn", c.buttonGreen)}>
                {lcs("save_changes")}
              </button>
              <button type="button" className={cx("btn", "btn-light")} onClick={onClickCancel}>
                {lcs("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return <>{editing ? renderForm() : renderCard()}</>;
}

export default ProjectHeader;