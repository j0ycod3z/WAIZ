/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProfilePrimarySkills extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "profile.*",
      ];

    super(
      "PROFILE_PRIMARY_SKILLS",
      "profile_primary_skills",
      (state) => state.profilePrimarySkills,
      fetch
    );
  }

  getProfilePrimarySkillList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProfilePrimarySkillDetails(profilePrimarySkillId, callback) {
    return this.getDetails("", profilePrimarySkillId, callback);
  }

  saveProfilePrimarySkill(profilePrimarySkill, callback) {
    return this.postData("", profilePrimarySkill, callback);
  }

  setProfilePrimarySkill(profilePrimarySkillId, profilePrimarySkill, callback) {
    return this.putData("", profilePrimarySkillId, profilePrimarySkill, callback);
  }

  deleteProfilePrimarySkill(profilePrimarySkillId, callback) {
    return this.deleteData("", profilePrimarySkillId, callback);
  }
}

export default _ProfilePrimarySkills;