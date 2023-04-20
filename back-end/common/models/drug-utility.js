'use strict';

module.exports = function(DrugUtility) {
  DrugUtility.updateDrugUtility = async(body) => {

    const {
      name,
      description
    } = body;

    const drug = await DrugUtility.findById(body.id);
    delete body.id;

    await drug.patchAttributes({
      name,
      description,
    });

    return {status: true};
  };

  DrugUtility.remoteMethod('updateDrugUtility', {
    description: 'Updating the drug utility for provided attributes',
    accepts: [{arg: 'body', type: 'object', http: {source: 'body'}}],
    returns: {
      type: 'object',
      root: true,
    },
    http: {verb: 'put', path: '/update-utility'},
  });
};
