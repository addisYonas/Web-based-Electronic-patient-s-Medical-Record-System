'use strict';

module.exports = function(DrugClass) {
  DrugClass.updateDrugClass = async(body) => {

    const {
      name,
      description,
      utilityId
    } = body;

    const drug = await DrugClass.findById(body.id);
    delete body.id;

    await drug.patchAttributes({
      name,
      description,
      utilityId
    });

    return {status: true};
  };

  DrugClass.remoteMethod('updateDrugClass', {
    description: 'Updating the drug utility class for provided attributes',
    accepts: [{arg: 'body', type: 'object', http: {source: 'body'}}],
    returns: {
      type: 'object',
      root: true,
    },
    http: {verb: 'put', path: '/update-class'},
  });
};
