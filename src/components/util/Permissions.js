const getProjectPermissions = (project, userIdd) =>
{
  const userId = userIdd ? userIdd : parseInt(sessionStorage.getItem("id"));
  const permissions = [];

  if (project.admin != null &&
    project.admin_id == userId &&
    project.cohort == null) {
    permissions.push("ADMIN")
    permissions.push("MEMBER")
  }
  if (project.member_ids.includes(userId))
    permissions.push("MEMBER")
  if (project.mentor_ids.includes(userId))
    permissions.push("MENTOR")
  if (project.cohort != null) {
    if (project.cohort.admin_id == userId)
      permissions.push("C_ADMIN");
    if (project.cohort.mentor_ids.includes(userId))
      permissions.push("C_ADMIN");
    if (project.cohort.instructor_ids.includes(userId))
      permissions.push("C_INSTRUCTOR");
  }
  return permissions;
}

const getCohortPermissions = (cohort, userIdd) =>
{
  const userId = userIdd ? userIdd : parseInt(sessionStorage.getItem("id"));
  const permissions = [];
  if (cohort.admin_id == userId)
    permissions.push("ADMIN")
  if (cohort.mentor_ids.includes(userId))
    permissions.push("ADMIN")
  if (cohort.instructor_ids.includes(userId))
    permissions.push("INSTRUCTOR")
  return permissions;
}


const hasProjectPermission = (project, perms, userId) =>
{
  const permissions = getProjectPermissions(project, userId);
  let res = false;
  for (let perm of perms)
    res = res || permissions.includes(perm)
  return res;
}

const hasCohortPermission = (cohort, perms, userId) =>
{
  const permissions = getCohortPermissions(cohort, userId);
  let res = false;
  for (let perm of perms)
    res = res || permissions.includes(perm)
  return res;
}

const getProfilePermissions = (profile, attr) =>
{
  const userId = sessionStorage.getItem("id");
  const permissions = [];
  if (profile.user_id == userId) {
    permissions.push("EDIT");
    permissions.push("VIEW");
  }
  return permissions;
}

const hasProfilePermission = (profile, attr, permission) =>
{
  const permissions = getProfilePermissions(profile, attr);
  return permissions.includes(permission);
}

export { hasProjectPermission, hasProfilePermission, hasCohortPermission };