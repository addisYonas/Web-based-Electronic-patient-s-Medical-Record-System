'use strict';

module.exports = UserAccount => {
  UserAccount.validatesUniquenessOf('phone');
  UserAccount.afterRemote("login", async (ctx, result) => {
    const {userInfo} = result;

    if (!userInfo || !userInfo.isActive) {
      await UserAccount.logoutUser(result.id);
      throw Error("Your Account is Inactive!", 403);
    }

    ctx.result = {
      token: result.id,
      id: userInfo.id,
      fullName: userInfo.fullName,
      username: userInfo.username,
      phone: userInfo.phone,
      role: userInfo.userRole ? userInfo.userRole.name : "",
    };

  });

  //Find userAccount by username
  UserAccount.findByUsername = async username => {
    const userAccount = await UserAccount.findOne({
      where: {username},
      include: [
        {
          relation: "userRole",
          scope: {
            fields: ["name"]
          }
        }
      ]
    });

    if (!userAccount) throw Error("Unknown userAccount", 412);

    return userAccount;
  };
  UserAccount.remoteMethod("findByUsername", {
    description: "Finds userAccount by specified username",
    accepts: [{arg: "username", type: "string", required: true}],
    returns: {
      type: "object",
      root: true
    },
    http: {verb: "get", path: "/:username/username"}
  });

  // update user account
  UserAccount.updateAccount = async body => {
    const fields = [
      "id",
      "fullName",
      "username",
      "email",
      "address",
      "phone",
      "userRoleId"
    ];

    const account = await UserAccount.findById(body.id);
    delete body.id;

    await account.patchAttributes({...body});

    return {status: true};
  };
  UserAccount.remoteMethod("updateAccount", {
    description: "Update a user Account",
    accepts: [{arg: "body", type: "object", http: {source: "body"}}],
    returns: {
      type: "object",
      root: true
    },
    http: {verb: "put", path: "/update-account"}
  });

  // activate user
  UserAccount.activateUser = async userId => {
    const account = await UserAccount.findById(userId);
    if (!account) throw Error("Undefined User", 422);

    await account.patchAttributes({isActive: true});
    return {status: true};
  };

  UserAccount.remoteMethod("activateUser", {
    description: "Activates user Account",
    accepts: [{arg: "userId", type: "string", required: true}],
    returns: {
      type: "object",
      root: true
    },
    http: {verb: "post", path: "/activate-user"}
  });

  // deactivate user
  UserAccount.deactivateUser = async userId => {
    const account = await UserAccount.findById(userId);
    if (!account) throw Error("Undefined User", 422);

    await account.patchAttributes({isActive: false});
    return {status: true};
  };
  UserAccount.remoteMethod("deactivateUser", {
    description: "deactivate user Account",
    accepts: [{arg: "userId", type: "string", required: true}],
    returns: {
      type: "object",
      root: true
    },
    http: {verb: "post", path: "/deactivate-user"}
  });

  // custom user logout endpoint
  UserAccount.logoutUser = async tokenId => {
    const {CustomAccessToken} = UserAccount.app.models;
    if (!tokenId) return true;

    const token = await CustomAccessToken.findOne({
      where: {
        id: tokenId
      }
    });
    if (!token) return true;

    try {
      await UserAccount.logout(tokenId);
    } catch (err) {
      throw err;
    }
    return true;
  };
  UserAccount.remoteMethod("logoutUser", {
    accepts: [
      {
        arg: "tokenId",
        type: "string",
        http: ctx => {
          const req = ctx && ctx.req;
          const accessToken = req && req.accessToken;
          const tokenId = accessToken ? accessToken.id : undefined;
          return tokenId;
        }
      }
    ],
    returns: {type: "object", root: true},
    http: {path: "/logout-user", verb: "post"}
  });

  // change password
  UserAccount.updatePassword = async (
    oldPassword,
    newPassword,
    accessToken
  ) => {
    if (!accessToken || !accessToken.userId)
      throw Error("Unauthorized User", 403);

    // find current user
    const user = await UserAccount.findById(accessToken.userId);
    if (!user) throw Error("Unauthorized User", 403);

    // check if old password is correct
    const isMatch = await new Promise(resolve => {
      bcrypt.compare(oldPassword, user.password, (err, match) => {
        resolve(match);
      });
    });

    // if old password is not correct throw Error
    if (!isMatch) throw Error("Incorrect Old Password", 401);

    await user.patchAttributes({
      password: newPassword,
      passwordChangeRequested: false
    });

    const resp = await UserAccount.login({
      username: user.username,
      password: newPassword
    });

    return {tokenId: resp.id};
  };
  UserAccount.remoteMethod("updatePassword", {
    description: "Request password change",
    accepts: [
      {arg: "oldPassword", type: "string", required: true},
      {arg: "newPassword", type: "string", required: true},
      {
        arg: "tokenId",
        type: "object",
        http: ctx => {
          const req = ctx && ctx.req;
          const accessToken = req && req.accessToken ? req.accessToken : null;
          return accessToken;
        }
      }
    ],
    returns: {
      type: "object",
      root: true
    },
    http: {verb: "post", path: "/update-password"}
  });

};
