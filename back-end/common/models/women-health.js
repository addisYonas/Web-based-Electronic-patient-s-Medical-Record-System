'use strict';

module.exports = function(WomenHealth) {
//Create womenHealth
  WomenHealth.createWomenHealth = async(accessToken, body) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    try {
      const womenHealth = await WomenHealth.create({
        ...body,
        filledById: accessToken.userId,
      });

      return womenHealth;
    } catch (err) {
      throw err;
    }
  };

  WomenHealth.remoteMethod('createWomenHealth', {
    description: 'Creates womenHealth',
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
      arg: 'womenHealthObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'post', path: '/'},
  });

  //Generate womenHealth
  WomenHealth.generateWomenHealth = async(accessToken, id) => {
    if (!accessToken || !accessToken.userId) throw Error('Forbidden User', 403);

    const womenHealth = await WomenHealth.find({
      where: {patientId: id},
      order: 'createdAt DESC',
    });

    let generatedHistory = {
      noOfPregnancies: null,
      noOfDeliveries: null,
      noOfAbortions: null,
      noOfMiscarriages: null,
      ageAtFirstMense: null,
      lengthOfMense: null,
      concernsOfMense: null,
    };

    for (let i = 0; i < womenHealth.length; i++) {
      if (generatedHistory.noOfPregnancies == null && womenHealth[i].noOfPregnancies) {
        generatedHistory.noOfPregnancies = womenHealth[i].noOfPregnancies;
      }
      if (generatedHistory.noOfDeliveries == null && womenHealth[i].noOfDeliveries) {
        generatedHistory.noOfDeliveries = womenHealth[i].noOfDeliveries;
      }
      if (generatedHistory.noOfAbortions == null && womenHealth[i].noOfAbortions) {
        generatedHistory.noOfAbortions = womenHealth[i].noOfAbortions;
      }
      if (generatedHistory.noOfMiscarriages == null && womenHealth[i].noOfMiscarriages) {
        generatedHistory.noOfMiscarriages = womenHealth[i].noOfMiscarriages;
      }
      if (generatedHistory.ageAtFirstMense == null && womenHealth[i].ageAtFirstMense) {
        generatedHistory.ageAtFirstMense = womenHealth[i].ageAtFirstMense;
      }
      if (generatedHistory.lengthOfMense == null && womenHealth[i].lengthOfMense) {
        generatedHistory.lengthOfMense = womenHealth[i].lengthOfMense;
      }
      if (generatedHistory.concernsOfMense == null && womenHealth[i].concernsOfMense) {
        generatedHistory.concernsOfMense = womenHealth[i].concernsOfMense;
      }

      if (generatedHistory.noOfPregnancies != null &&
        generatedHistory.noOfDeliveries != null &&
        generatedHistory.noOfAbortions != null &&
        generatedHistory.noOfMiscarriages != null &&
        generatedHistory.ageAtFirstMense != null &&
        generatedHistory.lengthOfMense != null &&
        generatedHistory.concernsOfMense != null) {
        break;
      }
    }

    return generatedHistory;
  };

  WomenHealth.remoteMethod('generateWomenHealth', {
    description: 'Generates womenHealth',
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
      arg: 'womenHealthObject',
      type: 'object',
      root: true,
    },
    http: {verb: 'get', path: '/generate/:id'},
  });
};
