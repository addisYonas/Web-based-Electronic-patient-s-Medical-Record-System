'use strict';

module.exports = function(Drug) {

  Drug.updateDrug = async(body) => {

    const {
      name,
      utility,
      classOfUtility,
      strengths,
      form,
    } = body;

    const drug = await Drug.findById(body.id);
    delete body.id;

    await drug.patchAttributes({
      name,
      utility,
      classOfUtility,
      strengths,
      form,
    });

    return {status: true};
  };

  Drug.remoteMethod('updateDrug', {
    description: 'Updating the drug for provided attributes',
    accepts: [{arg: 'body', type: 'object', http: {source: 'body'}}],
    returns: {
      type: 'object',
      root: true,
    },
    http: {verb: 'put', path: '/update-drug'},
  });
};
