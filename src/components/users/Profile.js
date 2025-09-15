import React, { useEffect } from "react";
import redux from 'seed/redux';
import { hasProfilePermission } from 'components/util/Permissions';
import cx from "classnames";

import c from "resources/css/users/Profile.module.css";
import Card from "components/users/Card";
import Projects from 'components/users/Projects'
import Skills from "components/users/Skills";
import Details from "components/users/Details";
import Export from "components/users/Export";
import Loading from 'seed/components/helpers/Loading';

function Profile(props) {
  const {
    profiles = [],
    projects = [],
    match,
    setProfile,
    setProfileEducation,
    setProfileLaboral,
    setProfileLanguage,
    setProfilePrimarySkill,
    setProfileSecondarySkill,
    getProfileList,
    getProjectList
  } = props;

  const userId = match.params.user_id;
  const profile = profiles.find((p) => p.user.id == userId);

  useEffect(() => {
    getProfileList({ user: userId });
    getProjectList({ "admin_id": userId });
    getProjectList({ "member_ids": userId });
    getProjectList({ "mentor_ids": userId });
  }, [userId, getProfileList, getProjectList]);

  if (profile == null) return <Loading />;

    return (
      <div className={c.module}>
        <div className={"container"}>
          <div className={cx("row", c.spacingContainer, "justify-content-md-center")}>
            <div className={cx("col-md-4")}>
              <Card 
                profile={profile} 
                userId={userId} 
                setProfile={setProfile}
              />
              <Projects 
                profile={profile} 
                userId={userId} 
                projects={projects}
              />
            </div>
            <div className={cx("col-md-8")}>
              <Details
                profile={profile}
                setProfile={setProfile}
                setProfileEducation={setProfileEducation}
                setProfileLaboral={setProfileLaboral}
                setProfileLanguage={setProfileLanguage}
              />
              <Skills
                profile={profile}
                setProfile={setProfile}
                setProfilePrimarySkill={setProfilePrimarySkill}
                setProfileSecondarySkill={setProfileSecondarySkill}
              />
              {hasProfilePermission(profile, "EDIT") &&
                <Export profile={profile} />
              }
            </div>
          </div>
        </div>
      </div>
    );
}

export default redux(Profile);