module.exports = CustomAccessToken => {
  CustomAccessToken.observe("before save", async ctx => {
    if (ctx.instance && ctx.isNewInstance) {
      const {UserAccount} = CustomAccessToken.app.models;
      let userInfo = {};
      try {
        userInfo = await UserAccount.findById(ctx.instance.userId, {
          include: ["userRole"]
        });
      } catch (error) {
        throw error;
      }

      if (userInfo) {
        const userAccountInfo = userInfo.toJSON();
        delete userAccountInfo.password;
        delete userAccountInfo.confirmationCode;
        ctx.instance.userInfo = userAccountInfo;
      }
    }
  });
};
