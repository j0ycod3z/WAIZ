import React, { Component } from "react";
import redux from 'seed/redux';
import { hasProfilePermission } from 'components/util/Permissions';
import cx from "classnames";

import "resources/bootstrap.min.module.css";
import c from "resources/css/users/Profile.module.css";
import Card from "components/users/Card";
import Projects from 'components/users/Projects'
import Skills from "components/users/Skills";
import Details from "components/users/Details";
import Export from "components/users/Export";
import Loading from 'seed/components/helpers/Loading';


class Profile extends Component
{
  render()
  {
    const { profiles = [] } = this.props;
    const { projects = [] } = this.props;
    const userId = this.props.match.params.user_id;

    const profile = profiles.filter(p => p.user.id == userId)[0];
    if (profile == null) return <Loading />;

    return (
      <div className={c.module}>
        <div className={"container"}>
          <div
            className={cx(
              "row",
              c.spacingContainer,
              "justify-content-md-center"
            )}
            style={{ paddingTop: "30px" }}>
            <div className={cx("col-sm-10", "col-md-4", "col-lg-4", "col-xl-4")}>
              <Card
                profile={profile}
                userId={userId}
                setProfile={this.props.setProfile} />
              <Projects
                profile={profile}
                userId={userId}
                projects={projects} />
            </div>
            <div
              className={cx("col-sm-10", "col-md-8", "col-lg-7", "col-xl-7")}>
              <Details
                profile={profile}
                setProfile={this.props.setProfile}
                setProfileEducation={this.props.setProfileEducation}
                setProfileLaboral={this.props.setProfileLaboral}
                setProfileLanguage={this.props.setProfileLanguage} />
              <Skills
                profile={profile}
                setProfile={this.props.setProfile}
                setProfilePrimarySkill={this.props.setProfilePrimarySkill}
                setProfileSecondarySkill={this.props.setProfileSecondarySkill} />
              <br />
              {
                hasProfilePermission(profile, "skills", "EDIT") ?
                  <Export
                    profile={profile} /> : null}
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount()
  {
    const userId = this.props.match.params.user_id;
    this.loadData(userId);
  }

  componentWillReceiveProps(nextProps)
  {
    if (nextProps.match.params.user_id !== this.props.match.params.user_id) {
      const userId = nextProps.match.params.user_id;
      this.loadData(userId);
    }
  }

  loadData(userId)
  {
    this.props.getProfileList({ user: userId });
    this.props.getProjectList({ "admin_id": userId });
    this.props.getProjectList({ "member_ids": userId });
    this.props.getProjectList({ "mentor_ids": userId });
  }
}

export default redux(Profile);
