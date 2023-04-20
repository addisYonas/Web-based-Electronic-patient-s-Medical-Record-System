'use strict';

module.exports = function(Prescription) {

  //Create prescription
  Prescription.createPrescription = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const prescription = await Prescription.create({
        ...body,
        orderedById: accessToken.userId,
      });

      return prescription;
    } catch (err) {
      throw err;
    }
  };

  Prescription.remoteMethod('createPrescription', {
    description: 'Creates prescription',
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
      arg: 'prescriptionObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
