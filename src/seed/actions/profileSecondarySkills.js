/*
__Seed builder__v0.2.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from "seed/helpers/action";

class _ProfileSecondarySkills extends Action {
  constructor(fetch) {
    if (fetch == null)
      fetch = [
        "profile.*",
      ];

    super(
      "PROFILE_SECONDARY_SKILLS",
      "profile_secondary_skills",
      (state) => state.profileSecondarySkills,
      fetch
    );
  }

  getProfileSecondarySkillList(params = {}, callback) {
    return this.getList("", params, callback);
  }

  getProfileSecondarySkillDetails(profileSecondarySkillId, callback) {
    return this.getDetails("", profileSecondarySkillId, callback);
  }

  saveProfileSecondarySkill(profileSecondarySkill, callback) {
    return this.postData("", profileSecondarySkill, callback);
  }

  setProfileSecondarySkill(profileSecondarySkillId, profileSecondarySkill, callback) {
    return this.putData("", profileSecondarySkillId, profileSecondarySkill, callback);
  }

  deleteProfileSecondarySkill(profileSecondarySkillId, callback) {
    return this.deleteData("", profileSecondarySkillId, callback);
  }
}

export default _ProfileSecondarySkills;