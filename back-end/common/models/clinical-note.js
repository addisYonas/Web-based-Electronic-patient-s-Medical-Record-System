'use strict';

module.exports = function(ClinicalNote) {
//Create clinicalNote
  ClinicalNote.createClinicalNote = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const clinicalNote = await ClinicalNote.create({
        ...body,
        filledById: accessToken.userId,
      });

      return clinicalNote;
    } catch (err) {
      throw err;
    }
  };

  ClinicalNote.remoteMethod('createClinicalNote', {
    description: 'Creates clinicalNote',
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
      arg: 'clinicalNoteObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });
};
