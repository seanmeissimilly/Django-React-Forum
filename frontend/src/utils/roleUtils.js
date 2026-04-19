export const getRole = (user) => {
  const roles = [];

  // Para los usuarios que tengan este Rol.
  if (user.is_superuser && user.is_staff) roles.push("Admin API");

  const roleMap = {
    admin: "Admin",
    editor: "Editor",
    reader: "Lector",
  };

  if (roleMap[user.role]) {
    roles.push(roleMap[user.role]);
  }

  return roles.join(", ");
};
