const getProjectPermissions = (project, userId = parseInt(sessionStorage.getItem("id"))) => {
  const {admin, admin_id, member_ids, mentor_ids, cohort} = project;
  const permissions = [];

  if (admin != null && admin_id == userId && cohort == null) {
    permissions.push("ADMIN")
    permissions.push("MEMBER")
  }

  if (member_ids.includes(userId))
    permissions.push("MEMBER")
  if (mentor_ids.includes(userId))
    permissions.push("MENTOR")

  if (cohort?.admin_id == userId)
    permissions.push("C_ADMIN");
  if (cohort?.mentor_ids.includes(userId))
    permissions.push("C_ADMIN");
  if (cohort?.instructor_ids.includes(userId))
    permissions.push("C_INSTRUCTOR");
  return permissions;
}

const getCohortPermissions = (cohort, userId = parseInt(sessionStorage.getItem("id"))) => {
  const { admin_id, mentor_ids, instructor_ids } = cohort;
  const permissions = [];

  if (admin_id == userId)
    permissions.push("ADMIN")
  if (mentor_ids.includes(userId))
    permissions.push("ADMIN")
  if (instructor_ids.includes(userId))
    permissions.push("INSTRUCTOR")
  return permissions;
}

const hasProjectPermission = (project, perms, userId) => {
  const permissions = getProjectPermissions(project, userId);
  let res = false;
  for (let perm of perms)
    res = res || permissions.includes(perm)
  return res;
}

const hasCohortPermission = (cohort, perms, userId) => {
  const permissions = getCohortPermissions(cohort, userId);
  let res = false;
  for (let perm of perms)
    res = res || permissions.includes(perm)
  return res;
}

const getProfilePermissions = (profile) => {
  const userId = parseInt(sessionStorage.getItem("id"));
  const permissions = [];
  
  if (profile.user_id === userId) {
    permissions.push("EDIT");
    permissions.push("VIEW");
  }
  return permissions;
}

const hasProfilePermission = (profile, permission) => {
  return getProfilePermissions(profile).includes(permission);
}

export { hasProjectPermission, hasProfilePermission, hasCohortPermission };