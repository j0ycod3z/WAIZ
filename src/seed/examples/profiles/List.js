import React from "react";
import cx from "classnames";
import { useQuery } from "seed/gql";
import { NavLink } from "react-router-dom";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profiles/List.module.css";

const PROFILES  = `
{
  profiles {
    phone
    gender
    age
    bio
    country
    state
    industry
    preferredLang
    website
    linkedin
    github
    facebook
    twitter
    angelList
    made
    phoneVisibility
    genderVisibility
    ageVisibility
    bioVisibility
    countryVisibility
    stateVisibility
    industryVisibility
    websiteVisibility
    linkedinVisibility
    githubVisibility
    facebookVisibility
    twitterVisibility
    angelListVisibility
    madeVisibility
    educationsVisibility
    laboralsVisibility
    languagesVisibility
    primarySkillsVisibility
    secondarySkillsVisibility
    user { }
    educations { }
    laborals { }
    languages { }
    primarySkills { }
    secondarySkills { }
  }
}
`;

function ProfileList(props)
{
  const { url } = props.match;

  const qProfiles = useQuery(PROFILES);

  if (qProfiles.loading) return <Loading />;
  if (qProfiles.error) return "Error";

  const { profiles } = qProfiles.data;

  const profileList = profiles.map(item =>
    <NavLink
      key={item.id}
      to={`${url}/${item.id}`}
      className={styles.item}
      activeClassName={styles.active}>
        <div className={styles.title}>{item.id}</div>
        <div className={styles.subtitle}>{JSON.stringify(item)}</div>
    </NavLink>);

  return (
    <div className={styles.module}>
      { profileList }
    </div>
  );
}

export default ProfileList;