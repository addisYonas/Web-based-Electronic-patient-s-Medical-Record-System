'use strict';

module.exports = function(SocialHistory) {
//Create socialHistory
  SocialHistory.createSocialHistory = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const socialHistory = await SocialHistory.create({
        ...body,
        filledById: accessToken.userId,
      });

      return socialHistory;
    } catch (err) {
      throw err;
    }
  };

  SocialHistory.remoteMethod('createSocialHistory', {
    description: 'Creates socialHistory',
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
      arg: 'socialHistoryObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });

  //Generate socialHistory
  SocialHistory.generateSocialHistory = async(accessToken, id) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    const socialHistory = await SocialHistory.find({
      where: {patientId: id},
      order: 'createdAt DESC',
    });

    let generatedHistory = {
      occupation: null,
      employer: null,
      educationalStatus: null,
      martialStatus: null,
      noOfChildren: null,
    };

    for (let i = 0; i < socialHistory.length; i++) {
      if (generatedHistory.occupation == null && socialHistory[i].occupation) {
        generatedHistory.occupation = socialHistory[i].occupation;
      }
      if (generatedHistory.employer == null && socialHistory[i].employer) {
        generatedHistory.employer = socialHistory[i].employer;
      }
      if (generatedHistory.educationalStatus == null && socialHistory[i].educationalStatus) {
        generatedHistory.educationalStatus = socialHistory[i].educationalStatus;
      }
      if (generatedHistory.martialStatus == null && socialHistory[i].martialStatus) {
        generatedHistory.martialStatus = socialHistory[i].martialStatus;
      }
      if (generatedHistory.noOfChildren == null && socialHistory[i].noOfChildren) {
        generatedHistory.noOfChildren = socialHistory[i].noOfChildren;
      }

      if (generatedHistory.occupation != null &&
        generatedHistory.employer != null &&
        generatedHistory.educationalStatus != null &&
        generatedHistory.martialStatus != null &&
        generatedHistory.noOfChildren != null) {
        break;
      }
    }

    return generatedHistory;
  };

  SocialHistory.remoteMethod('generateSocialHistory', {
    description: 'Generates socialHistory',
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
      {arg: 'id', type: 'string', required: true},
    ],
    returns: {
      arg: 'socialHistoryObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'get', path: '/generate/:id'},
  });
};
