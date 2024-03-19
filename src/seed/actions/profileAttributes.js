/*
__Seed builder__v1.0
  AUTO_GENERATED (Read only)
  Modify via builder
*/

import Action from 'seed/helpers/action';

class _ProfileAttributes extends Action
{
  constructor(fetch)
  {
    if (fetch == null)
      fetch = [
        "profile.*",
      ];

    super(
      `PROFILE_ATTRIBUTES`,
      `profile_attributes`,
      state => state.profileAttributes,
      fetch
    )
  }

  getProfileAttributeList(params = {}, callback)
  {
    return this.getList('', params, callback);
  }

  getProfileAttributeDetails(profileAttributeId, callback)
  {
    return this.getDetails(profileAttributeId, '', callback);
  }

  saveProfileAttribute(profileAttribute, callback)
  {
    return this.saveData('', profileAttribute, callback);
  }

  setProfileAttribute(profileAttributeId, profileAttribute, callback)
  {
    return this.setData(profileAttributeId, '', profileAttribute, callback);
  }

  deleteProfileAttribute(profileAttributeId, callback)
  {
    return this.deleteData(profileAttributeId, '', callback);
  }
}

export default _ProfileAttributes;
