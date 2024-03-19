import React from "react";
import cx from "classnames";
import { useDetail } from "seed/gql";
import Loading from "seed/components/helpers/Loading";
import styles from "resources/css/seed/examples/profiles/Details.module.css";

const PROFILE  = `
{
  profile {
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

function ProfileDetails(props) {

  const { profile_id }  = props.match.params;
  const qProfile = useDetail(PROFILE, profile_id);

  if (qProfile.loading) return <Loading />;
  if (qProfile.error) return "Error";

  const { profile = {} } = qProfile.data;

  return (
    <div className={styles.module}>
      <label className={styles.lbl}>Phone</label><br/>
      <label className={styles.txt}>{profile.phone.toString()}</label>
      <br/>
      <label className={styles.lbl}>Gender</label><br/>
      <label className={styles.txt}>{profile.gender.toString()}</label>
      <br/>
      <label className={styles.lbl}>Age</label><br/>
      <label className={styles.txt}>{profile.age.toString()}</label>
      <br/>
      <label className={styles.lbl}>Bio</label><br/>
      <label className={styles.txt}>{profile.bio.toString()}</label>
      <br/>
      <label className={styles.lbl}>Country</label><br/>
      <label className={styles.txt}>{profile.country.toString()}</label>
      <br/>
      <label className={styles.lbl}>State</label><br/>
      <label className={styles.txt}>{profile.state.toString()}</label>
      <br/>
      <label className={styles.lbl}>Industry</label><br/>
      <label className={styles.txt}>{profile.industry.toString()}</label>
      <br/>
      <label className={styles.lbl}>Preferred lang</label><br/>
      <label className={styles.txt}>{profile.preferredLang.toString()}</label>
      <br/>
      <label className={styles.lbl}>Website</label><br/>
      <label className={styles.txt}>{profile.website.toString()}</label>
      <br/>
      <label className={styles.lbl}>Linkedin</label><br/>
      <label className={styles.txt}>{profile.linkedin.toString()}</label>
      <br/>
      <label className={styles.lbl}>Github</label><br/>
      <label className={styles.txt}>{profile.github.toString()}</label>
      <br/>
      <label className={styles.lbl}>Facebook</label><br/>
      <label className={styles.txt}>{profile.facebook.toString()}</label>
      <br/>
      <label className={styles.lbl}>Twitter</label><br/>
      <label className={styles.txt}>{profile.twitter.toString()}</label>
      <br/>
      <label className={styles.lbl}>Angel list</label><br/>
      <label className={styles.txt}>{profile.angelList.toString()}</label>
      <br/>
      <label className={styles.lbl}>Made</label><br/>
      <label className={styles.txt}>{profile.made.toString()}</label>
      <br/>
      <label className={styles.lbl}>Phone visibility</label><br/>
      <label className={styles.txt}>{profile.phoneVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Gender visibility</label><br/>
      <label className={styles.txt}>{profile.genderVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Age visibility</label><br/>
      <label className={styles.txt}>{profile.ageVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Bio visibility</label><br/>
      <label className={styles.txt}>{profile.bioVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Country visibility</label><br/>
      <label className={styles.txt}>{profile.countryVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>State visibility</label><br/>
      <label className={styles.txt}>{profile.stateVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Industry visibility</label><br/>
      <label className={styles.txt}>{profile.industryVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Website visibility</label><br/>
      <label className={styles.txt}>{profile.websiteVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Linkedin visibility</label><br/>
      <label className={styles.txt}>{profile.linkedinVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Github visibility</label><br/>
      <label className={styles.txt}>{profile.githubVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Facebook visibility</label><br/>
      <label className={styles.txt}>{profile.facebookVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Twitter visibility</label><br/>
      <label className={styles.txt}>{profile.twitterVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Angel list visibility</label><br/>
      <label className={styles.txt}>{profile.angelListVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Made visibility</label><br/>
      <label className={styles.txt}>{profile.madeVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Educations visibility</label><br/>
      <label className={styles.txt}>{profile.educationsVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Laborals visibility</label><br/>
      <label className={styles.txt}>{profile.laboralsVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Languages visibility</label><br/>
      <label className={styles.txt}>{profile.languagesVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Primary skills visibility</label><br/>
      <label className={styles.txt}>{profile.primarySkillsVisibility.toString()}</label>
      <br/>
      <label className={styles.lbl}>Secondary skills visibility</label><br/>
      <label className={styles.txt}>{profile.secondarySkillsVisibility.toString()}</label>
      <br/>
    </div>
  );
}

export default ProfileDetails;