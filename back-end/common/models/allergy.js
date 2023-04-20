'use strict';

module.exports = function(Allergy) {

  //Create allergy
  Allergy.createAllergy = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const allergy = await Allergy.create({
        ...body,
        filledById: accessToken.userId,
      });

      return allergy;
    } catch (err) {
      throw err;
    }
  };

  Allergy.remoteMethod('createAllergy', {
    description: 'Creates allergy',
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
      arg: 'allergyObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
