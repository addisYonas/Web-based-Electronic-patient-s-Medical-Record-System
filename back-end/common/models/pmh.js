'use strict';

module.exports = function(PMH) {
//Create pmh
  PMH.createPMH = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const pmh = await PMH.create({
        ...body,
        filledById: accessToken.userId,
      });

      return pmh;
    } catch (err) {
      throw err;
    }
  };

  PMH.remoteMethod('createPMH', {
    description: 'Creates pmh',
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
      arg: 'pmhObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
