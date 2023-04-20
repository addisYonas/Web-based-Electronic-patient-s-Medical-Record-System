'use strict';

module.exports = function(FamilyMedical) {
//Create familyMedical
  FamilyMedical.createFamilyMedical = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const familyMedical = await FamilyMedical.create({
        ...body,
        filledById: accessToken.userId,
      });

      return familyMedical;
    } catch (err) {
      throw err;
    }
  };

  FamilyMedical.remoteMethod('createFamilyMedical', {
    description: 'Creates familyMedical',
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
      arg: 'familyMedicalObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
