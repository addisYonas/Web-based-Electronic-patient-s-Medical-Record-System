'use strict';

module.exports = function(Vaccination) {
//Create vaccination
  Vaccination.createVaccination = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const vaccination = await Vaccination.create({
        ...body,
        filledById: accessToken.userId,
      });

      return vaccination;
    } catch (err) {
      throw err;
    }
  };

  Vaccination.remoteMethod('createVaccination', {
    description: 'Creates vaccination',
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
      arg: 'vaccinationObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
