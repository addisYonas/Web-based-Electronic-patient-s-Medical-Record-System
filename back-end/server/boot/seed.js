const roleList = require("../data/roles.json");
const adminUserList = require("../data/admins.json");

const seedRoles = async server => {
  console.log("Seeding user roles ..."); // eslint-disable-line no-console
  const roles = roleList;
  const { UserRole } = server.models;

  return Promise.all(
    roles.map(role =>
      UserRole.findOrCreate({ where: { name: role.name } }, role)
    )
  );
};

const seedAdminUsers = async server => {
  console.log("Seeding admin users ..."); // eslint-disable-line no-console
  const users = adminUserList;
  const { UserAccount, UserRole } = server.models;

  const adminRole = await UserRole.findOne({
    where: { name: "Admin" }
  });

  if (!adminRole) {
    console.log("unable to find Admin role"); // eslint-disable-line no-console
    return false;
  }

  return Promise.all(
    users.map(user => {
      user.userRoleId = adminRole.id;
      return UserAccount.findOrCreate(
        { where: { or: [{ username: user.username }, { email: user.email }] } },
        user
      );
    })
  );
};


module.exports = async server => {
  try {
    await seedRoles(server);
    await seedAdminUsers(server);
  } catch (error) {
    console.log("Seed Error", error); // eslint-disable-line no-console
  }
};
