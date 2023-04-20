'use strict';

module.exports = function(OHI) {
//Create ohi
  OHI.createOHI = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const ohi = await OHI.create({
        ...body,
        filledById: accessToken.userId,
      });

      return ohi;
    } catch (err) {
      throw err;
    }
  };

  OHI.remoteMethod('createOHI', {
    description: 'Creates ohi',
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
      arg: 'ohiObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });

  //Generate OHI
  OHI.generateOHI = async(accessToken, id) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    const ohi = await OHI.find({
      where: {patientId: id},
      order: 'createdAt DESC',
    });

    let generatedHistory = {
      useTobacco: null,
      alcoholUse: null,
      sexualActivity: null,
      exercise: null,
      sleep: null,
      diet: null,
    };

    for (let i = 0; i < ohi.length; i++) {
      if (generatedHistory.useTobacco == null && ohi[i].useTobacco) {
        generatedHistory.useTobacco = ohi[i].useTobacco;
      }
      if (generatedHistory.alcoholUse == null && ohi[i].alcoholUse) {
        generatedHistory.alcoholUse = ohi[i].alcoholUse;
      }
      if (generatedHistory.sexualActivity == null && ohi[i].sexualActivity) {
        generatedHistory.sexualActivity = ohi[i].sexualActivity;
      }
      if (generatedHistory.exercise == null && ohi[i].exercise) {
        generatedHistory.exercise = ohi[i].exercise;
      }
      if (generatedHistory.sleep == null && ohi[i].sleep) {
        generatedHistory.sleep = ohi[i].sleep;
      }
      if (generatedHistory.diet == null && ohi[i].diet) {
        generatedHistory.diet = ohi[i].diet;
      }

      if (generatedHistory.useTobacco != null &&
        generatedHistory.alcoholUse != null &&
        generatedHistory.sexualActivity != null &&
        generatedHistory.exercise != null &&
        generatedHistory.sleep != null &&
        generatedHistory.diet != null) {
        break;
      }
    }

    return generatedHistory;
  };

  OHI.remoteMethod('generateOHI', {
    description: 'Generates other health history',
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
      arg: 'otherHealthHistoryObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'get', path: '/generate/:id'},
  });
};
