'use strict';

module.exports = function(Surgery) {
//Create surgery
  Surgery.createSurgery = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const surgery = await Surgery.create({
        ...body,
        filledById: accessToken.userId,
      });

      return surgery;
    } catch (err) {
      throw err;
    }
  };

  Surgery.remoteMethod('createSurgery', {
    description: 'Creates surgery',
    accepts: [
      {
        arg: 'accessToken',
        type: 'object',
        http: ctx => {
          const req = ctx && ctx.req;
          const accessToken = req && req.accessToken;
          return accessToken ? req.accessToken : null;
        },
      },
      {arg: 'body', type: 'object', http: {source: 'body'}},
    ],
    returns: {
      arg: 'surgeryObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
